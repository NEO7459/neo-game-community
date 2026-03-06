"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";

type FreePost = {
  id: string;
  title: string;
  content: string;
  author_email: string | null;
  created_at: string;
};

export default function FreePage() {
  const supabase = createClient();

  const [posts, setPosts] = useState<FreePost[]>([]);
  const [loading, setLoading] = useState(true);
  const [canWrite, setCanWrite] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setCanWrite(true);
      }

      const { data, error } = await supabase
        .from("free_posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setPosts(data);
      }

      setLoading(false);
    };

    loadData();
  }, [supabase]);

  return (
    <main className="min-h-screen bg-[#f5f7fb] px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold text-emerald-600">NEO FREE BOARD</p>
          <h1 className="mt-2 text-4xl font-black">자유게시판</h1>
          <p className="mt-2 text-slate-500">
            자유롭게 이야기하고 소통하는 공간입니다. 네이버 카페 느낌으로 편하게 사용하세요.
          </p>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <div className="text-sm text-slate-500">
            전체 글 <span className="font-bold text-slate-800">{posts.length}</span>
          </div>

          <div className="flex items-center gap-3">
            {canWrite && (
              <Link
                href="/free/write"
                className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-emerald-600"
              >
                글쓰기
              </Link>
            )}

            <Link
              href="/"
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              홈으로
            </Link>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="grid grid-cols-[100px_1fr_180px_140px] border-b border-slate-200 bg-slate-50 px-6 py-4 text-sm font-bold text-slate-600">
            <div>번호</div>
            <div>제목</div>
            <div>작성자</div>
            <div>작성일</div>
          </div>

          {loading ? (
            <div className="px-6 py-10 text-center text-slate-500">불러오는 중...</div>
          ) : posts.length === 0 ? (
            <div className="px-6 py-10 text-center text-slate-500">등록된 글이 없습니다.</div>
          ) : (
            posts.map((post, index) => (
              <Link
                key={post.id}
                href={`/free/${post.id}`}
                className="grid grid-cols-[100px_1fr_180px_140px] items-center border-b border-slate-100 px-6 py-4 text-sm transition hover:bg-slate-50"
              >
                <div className="text-slate-500">{posts.length - index}</div>
                <div className="truncate font-medium text-slate-800">{post.title}</div>
                <div className="truncate text-slate-500">
                  {post.author_email ? post.author_email.split("@")[0] : "익명"}
                </div>
                <div className="text-slate-500">
                  {new Date(post.created_at).toLocaleDateString("ko-KR")}
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </main>
  );
}