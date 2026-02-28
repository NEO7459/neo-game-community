"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
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

export default function PartyDetailPage() {
  const supabase = createClient();
  const params = useParams();

  const [post, setPost] = useState<PartyPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      const id = params.id as string;

      const { data, error } = await supabase
        .from("party_posts")
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
      <main className="min-h-screen bg-[#050816] px-6 py-12 text-white">
        <div className="mx-auto max-w-4xl">
          <p className="text-slate-400">불러오는 중...</p>
        </div>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="min-h-screen bg-[#050816] px-6 py-12 text-white">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <h1 className="text-3xl font-black">모집글을 찾을 수 없습니다.</h1>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050816] px-6 py-12 text-white">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/party"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            ← 파티 모집 목록
          </Link>

          <Link
            href="/"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            홈으로
          </Link>
        </div>

        <article className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <div className="mb-6 flex items-center gap-3">
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
            <span className="text-sm text-slate-400">
              {new Date(post.created_at).toLocaleDateString("ko-KR")}
            </span>
          </div>

          <h1 className="text-4xl font-black leading-tight">{post.title}</h1>

          <div className="mt-8 rounded-2xl bg-slate-950/40 p-6">
            <p className="text-lg leading-8 text-slate-200 whitespace-pre-wrap">
              {post.content}
            </p>
          </div>

          <div className="mt-8">
            <a
              href={post.discord_link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-5 py-3 font-bold text-white shadow-[0_0_20px_rgba(99,102,241,0.35)] transition hover:scale-105"
            >
              디스코드 참여하기
            </a>
          </div>
        </article>
      </div>
    </main>
  );
}