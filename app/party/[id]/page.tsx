"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
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
  const router = useRouter();

  const [post, setPost] = useState<PartyPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [canDelete, setCanDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const loadPost = async () => {
      const id = params.id as string;

      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from("party_posts")
        .select("*")
        .eq("id", id)
        .single();

      if (!error && data) {
        setPost(data);

        if (
          user?.email === "dogwho12@gmail.com" ||
          user?.email === data.author_email
        ) {
          setCanDelete(true);
        }
      }

      setLoading(false);
    };

    loadPost();
  }, [params, supabase]);

  const handleDelete = async () => {
    if (!post) return;

    const ok = window.confirm("이 모집글을 삭제할까요?");
    if (!ok) return;

    setDeleting(true);

    const { error } = await supabase
      .from("party_posts")
      .delete()
      .eq("id", post.id);

    if (error) {
      alert("삭제 실패: " + error.message);
      setDeleting(false);
      return;
    }

    router.push("/party");
    router.refresh();
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-sky-100 via-cyan-50 to-fuchsia-100 px-6 py-12 text-slate-900">
        <div className="mx-auto max-w-4xl">
          <p className="text-slate-500">불러오는 중...</p>
        </div>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-sky-100 via-cyan-50 to-fuchsia-100 px-6 py-12 text-slate-900">
        <div className="mx-auto max-w-4xl rounded-[32px] border border-white/60 bg-white/70 p-8 shadow-lg backdrop-blur-xl">
          <h1 className="text-3xl font-black">모집글을 찾을 수 없습니다.</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-100 via-cyan-50 to-fuchsia-100 px-6 py-12 text-slate-900">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/party"
            className="rounded-2xl border border-white/60 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-white"
          >
            ← 파티 모집 목록
          </Link>

          <div className="flex items-center gap-3">
            {canDelete && (
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="rounded-2xl bg-gradient-to-r from-rose-400 to-pink-400 px-4 py-2 text-sm font-bold text-white shadow-[0_0_20px_rgba(244,114,182,0.25)] transition hover:scale-105 disabled:opacity-60"
              >
                {deleting ? "삭제 중..." : "모집글 삭제"}
              </button>
            )}

            <Link
              href="/"
              className="rounded-2xl border border-white/60 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-white"
            >
              홈으로
            </Link>
          </div>
        </div>

        <article className="rounded-[32px] border border-white/60 bg-white/70 p-8 shadow-[0_20px_60px_rgba(56,189,248,0.12)] backdrop-blur-xl">
          <div className="mb-6 flex flex-wrap items-center gap-3">
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

            <span className="text-sm text-slate-500">
              {new Date(post.created_at).toLocaleDateString("ko-KR")}
            </span>
          </div>

          <h1 className="text-4xl font-black leading-tight">{post.title}</h1>

          <div className="mt-8 rounded-[24px] bg-gradient-to-br from-sky-50 to-fuchsia-50 p-6">
            <p className="text-lg leading-8 text-slate-700 whitespace-pre-wrap">
              {post.content}
            </p>
          </div>

          <div className="mt-8">
            <a
              href={post.discord_link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-5 py-3 font-bold text-white shadow-[0_0_24px_rgba(139,92,246,0.25)] transition hover:scale-105"
            >
              디스코드 참여하기
            </a>
          </div>
        </article>
      </div>
    </main>
  );
}