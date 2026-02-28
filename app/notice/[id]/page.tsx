"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase";

type Notice = {
  id: string;
  title: string;
  content: string;
  important: boolean;
  created_at: string;
  author_email: string | null;
};

export default function NoticeDetailPage() {
  const supabase = createClient();
  const params = useParams();

  const [notice, setNotice] = useState<Notice | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNotice = async () => {
      const id = params.id as string;

      const { data, error } = await supabase
        .from("notices")
        .select("*")
        .eq("id", id)
        .single();

      if (!error && data) {
        setNotice(data);
      }

      setLoading(false);
    };

    loadNotice();
  }, [params, supabase]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#050816] px-6 py-12 text-white">
        <div className="mx-auto max-w-4xl">
          <p className="text-slate-400">공지 불러오는 중...</p>
        </div>
      </main>
    );
  }

  if (!notice) {
    return (
      <main className="min-h-screen bg-[#050816] px-6 py-12 text-white">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex items-center justify-between">
            <Link
              href="/notice"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              ← 공지사항 목록
            </Link>

            <Link
              href="/"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              홈으로
            </Link>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <h1 className="text-3xl font-black">공지를 찾을 수 없습니다.</h1>
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
            href="/notice"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            ← 공지사항 목록
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
            {notice.important && (
              <span className="rounded-full bg-rose-400/20 px-3 py-1 text-xs font-bold text-rose-300">
                중요
              </span>
            )}
            <span className="text-sm text-slate-400">
              {new Date(notice.created_at).toLocaleDateString("ko-KR")}
            </span>
          </div>

          <h1 className="text-4xl font-black leading-tight">{notice.title}</h1>

          <div className="mt-8 rounded-2xl bg-slate-950/40 p-6">
            <p className="text-lg leading-8 text-slate-200 whitespace-pre-wrap">
              {notice.content}
            </p>
          </div>
        </article>
      </div>
    </main>
  );
}