"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";

type PartyPost = {
  id: string;
  game: string;
  title: string;
  content: string;
  discord_link: string;
  status: string;
  author_email: string | null;
  created_at: string;
};

export default function PartyPage() {
  const supabase = createClient();

  const [posts, setPosts] = useState<PartyPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user?.email === "dogwho12@gmail.com") {
        setIsAdmin(true);
      }

      const { data, error } = await supabase
        .from("party_posts")
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
    <main className="min-h-screen bg-[#050816] px-6 py-12 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold tracking-[0.2em] text-sky-300">
              NEO GAME COMMUNITY
            </p>
            <h1 className="mt-3 text-4xl font-black">파티 모집</h1>
            <p className="mt-2 text-slate-400">
              게임별 파티 모집 글을 확인하고 디스코드로 바로 참여하세요.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {isAdmin && (
              <Link
                href="/party/write"
                className="rounded-xl bg-gradient-to-r from-sky-400 to-cyan-300 px-4 py-2 text-sm font-bold text-slate-950 shadow-[0_0_20px_rgba(56,189,248,0.35)] transition hover:scale-105"
              >
                파티 모집 작성
              </Link>
            )}

            <Link
              href="/"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              홈으로
            </Link>
          </div>
        </div>

        {loading ? (
          <p className="text-slate-400">불러오는 중...</p>
        ) : posts.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-slate-400">
            등록된 파티 모집 글이 없습니다.
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
              >
                <div className="mb-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-sky-400/15 px-3 py-1 text-xs font-bold text-sky-300">
                      {post.game}
                    </span>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        post.status === "모집중"
                          ? "bg-emerald-400/15 text-emerald-300"
                          : "bg-rose-400/15 text-rose-300"
                      }`}
                    >
                      {post.status}
                    </span>
                    <h2 className="text-xl font-bold">{post.title}</h2>
                  </div>

                  <span className="text-sm text-slate-400">
                    {new Date(post.created_at).toLocaleDateString("ko-KR")}
                  </span>
                </div>

                <p className="mb-5 leading-7 text-slate-300">{post.content}</p>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href={`/party/${post.id}`}
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    상세 보기
                  </Link>

                  <a
                    href={post.discord_link}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-2 text-sm font-bold text-white shadow-[0_0_20px_rgba(99,102,241,0.35)] transition hover:scale-105"
                  >
                    디스코드 참여
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}