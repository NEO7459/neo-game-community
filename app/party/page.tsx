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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setIsLoggedIn(true);
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
    <main className="min-h-screen bg-gradient-to-br from-sky-100 via-cyan-50 to-fuchsia-100 px-6 py-12 text-slate-900">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold tracking-[0.2em] text-sky-600">
              NEO GAME COMMUNITY
            </p>
            <h1 className="mt-3 text-4xl font-black">파티 모집</h1>
            <p className="mt-2 text-slate-600">
              원하는 게임으로 자유롭게 모집글을 올리고 디스코드로 바로 참여하세요.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {isLoggedIn && (
              <Link
                href="/party/write"
                className="rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-400 px-5 py-3 text-sm font-bold text-white shadow-[0_0_25px_rgba(14,165,233,0.35)] transition hover:scale-105"
              >
                파티 모집 작성
              </Link>
            )}

            <Link
              href="/"
              className="rounded-2xl border border-white/50 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-800 shadow-sm backdrop-blur-md transition hover:bg-white"
            >
              홈으로
            </Link>
          </div>
        </div>

        {loading ? (
          <p className="text-slate-500">불러오는 중...</p>
        ) : posts.length === 0 ? (
          <div className="rounded-3xl border border-white/60 bg-white/70 p-8 text-slate-500 shadow-lg backdrop-blur-xl">
            등록된 파티 모집 글이 없습니다.
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post, index) => (
              <div
                key={post.id}
                className={`group relative rounded-[28px] border border-white/60 bg-white/70 p-5 shadow-[0_20px_60px_rgba(56,189,248,0.15)] backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-[0_25px_70px_rgba(168,85,247,0.18)] ${
                  index % 3 === 0
                    ? "rotate-[-1deg]"
                    : index % 3 === 1
                    ? "rotate-[1deg]"
                    : "rotate-[-0.5deg]"
                }`}
              >
                <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-sky-400/10 via-transparent to-fuchsia-400/10 opacity-0 transition group-hover:opacity-100" />

                <div className="relative">
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-sky-500/15 px-3 py-1 text-xs font-bold text-sky-700">
                      {post.game}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        post.status === "모집중"
                          ? "bg-emerald-500/15 text-emerald-700"
                          : "bg-rose-500/15 text-rose-700"
                      }`}
                    >
                      {post.status}
                    </span>
                  </div>

                  <h2 className="line-clamp-1 text-lg font-black text-slate-900">
                    {post.title}
                  </h2>

                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                    {post.content}
                  </p>

                  <div className="mt-4 text-xs text-slate-500">
                    {new Date(post.created_at).toLocaleDateString("ko-KR")}
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <Link
                      href={`/party/${post.id}`}
                      className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 transition hover:bg-slate-50"
                    >
                      상세 보기
                    </Link>

                    <a
                      href={post.discord_link}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-3 py-2 text-xs font-bold text-white shadow-[0_0_18px_rgba(139,92,246,0.25)] transition hover:scale-105"
                    >
                      디스코드 참여
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}