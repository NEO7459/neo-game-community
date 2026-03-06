"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase";

type FreePost = {
  id: string;
  title: string;
  content: string;
  author_email: string | null;
  created_at: string;
};

export default function FreeDetailPage() {
  const supabase = createClient();
  const params = useParams();

  const [post, setPost] = useState<FreePost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      const id = params.id as string;

      const { data, error } = await supabase
        .from("free_posts")
        .select("*")
        .eq("id", id)
        .single();

      if (!error && data) {
        setPost(data);
      }

      setLoading(false);
    };

    loadPost();
  }, [params, supabase]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f5f7fb] px-6 py-10 text-slate-900">
        <div className="mx-auto max-w-4xl">
          <p className="text-slate-500">불러오는 중...</p>
        </div>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="min-h-screen bg-[#f5f7fb] px-6 py-10 text-slate-900">
        <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-black">게시글을 찾을 수 없습니다.</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f7fb] px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-4xl">
        <div className="mb-4 flex items-center justify-between">
          <Link
            href="/free"
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            ← 목록으로
          </Link>

          <Link
            href="/"
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            홈으로
          </Link>
        </div>

        <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="border-b border-slate-200 pb-5">
            <h1 className="text-3xl font-black">{post.title}</h1>
            <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-500">
              <span>작성자: {post.author_email ? post.author_email.split("@")[0] : "익명"}</span>
              <span>작성일: {new Date(post.created_at).toLocaleDateString("ko-KR")}</span>
            </div>
          </div>

          <div className="pt-6">
            <p className="whitespace-pre-wrap leading-8 text-slate-700">{post.content}</p>
          </div>
        </article>
      </div>
    </main>
  );
}