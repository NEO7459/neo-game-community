"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase";

export default function NoticeWritePage() {
  const supabase = createClient();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [important, setImportant] = useState(false);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!title.trim() || !content.trim()) {
      setMessage("제목과 내용을 입력해주세요.");
      return;
    }

    setSaving(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setMessage("로그인이 필요합니다.");
      setSaving(false);
      return;
    }

    const { error } = await supabase.from("notices").insert({
      title: title.trim(),
      content: content.trim(),
      important,
      author_email: user.email ?? null,
    });

    if (error) {
      setMessage("저장 실패: " + error.message);
      setSaving(false);
      return;
    }

    router.push("/notice");
    router.refresh();
  };

  return (
    <main className="min-h-screen bg-[#050816] px-6 py-12 text-white">
      <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold tracking-[0.2em] text-sky-300">
              NEO GAME COMMUNITY
            </p>
            <h1 className="mt-3 text-4xl font-black">공지 작성</h1>
            <p className="mt-2 text-slate-400">
              관리자 전용 공지 작성 페이지입니다.
            </p>
          </div>

          <Link
            href="/notice"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            목록으로
          </Link>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              제목
            </label>
            <input
              type="text"
              placeholder="공지 제목 입력"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none placeholder:text-slate-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              내용
            </label>
            <textarea
              placeholder="공지 내용 입력"
              rows={8}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none placeholder:text-slate-500"
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
            {saving ? "저장 중..." : "공지 등록"}
          </button>
        </form>
      </div>
    </main>
  );
}