"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

type Notice = {
  id: string;
  title: string;
  content: string;
  important: boolean;
  created_at: string;
  author_email: string | null;
};

export default function NoticeEditPage() {
  const supabase = createClient();
  const params = useParams();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [important, setImportant] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadNotice = async () => {
      const id = params.id as string;

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user?.email === "dogwho12@gmail.com") {
        setIsAdmin(true);
      } else {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("notices")
        .select("*")
        .eq("id", id)
        .single();

      if (!error && data) {
        setTitle(data.title);
        setContent(data.content);
        setImportant(data.important);
      }

      setLoading(false);
    };

    loadNotice();
  }, [params, supabase]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const id = params.id as string;

    if (!title.trim() || !content.trim()) {
      setMessage("제목과 내용을 입력해주세요.");
      return;
    }

    setSaving(true);

    const { error } = await supabase
      .from("notices")
      .update({
        title: title.trim(),
        content: content.trim(),
        important,
      })
      .eq("id", id);

    if (error) {
      setMessage("수정 실패: " + error.message);
      setSaving(false);
      return;
    }

    router.push(`/notice/${id}`);
    router.refresh();
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#050816] px-6 py-12 text-white">
        <div className="mx-auto max-w-3xl">
          <p className="text-slate-400">불러오는 중...</p>
        </div>
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main className="min-h-screen bg-[#050816] px-6 py-12 text-white">
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <h1 className="text-3xl font-black">접근 권한이 없습니다.</h1>
          <div className="mt-6">
            <Link
              href="/notice"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              공지사항 목록으로
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050816] px-6 py-12 text-white">
      <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold tracking-[0.2em] text-sky-300">
              NEO GAME COMMUNITY
            </p>
            <h1 className="mt-3 text-4xl font-black">공지 수정</h1>
          </div>

          <Link
            href={`/notice/${params.id as string}`}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            상세로
          </Link>
        </div>

        <form className="space-y-4" onSubmit={handleUpdate}>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              제목
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              내용
            </label>
            <textarea
              rows={8}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none"
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-slate-300">
            <input
              type="checkbox"
              checked={important}
              onChange={(e) => setImportant(e.target.checked)}
            />
            중요 공지로 등록
          </label>

          {message && <p className="text-sm text-sky-300">{message}</p>}

          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-gradient-to-r from-sky-400 to-cyan-300 px-5 py-3 font-bold text-slate-950 disabled:opacity-60"
          >
            {saving ? "수정 중..." : "공지 수정"}
          </button>
        </form>
      </div>
    </main>
  );
}