"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase";

export default function FreeWritePage() {
  const supabase = createClient();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
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

    const { error } = await supabase.from("free_posts").insert({
      title: title.trim(),
      content: content.trim(),
      author_email: user.email ?? null,
    });

    if (error) {
      setMessage("저장 실패: " + error.message);
      setSaving(false);
      return;
    }

    router.push("/free");
    router.refresh();
  };

  return (
    <main className="min-h-screen bg-[#f5f7fb] px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-emerald-600">NEO FREE BOARD</p>
            <h1 className="mt-2 text-4xl font-black">자유게시판 글쓰기</h1>
          </div>

          <Link
            href="/free"
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            목록으로
          </Link>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              제목
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              내용
            </label>
            <textarea
              rows={10}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none"
            />
          </div>

          {message && <p className="text-sm text-emerald-600">{message}</p>}

          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-emerald-500 px-5 py-3 font-bold text-white disabled:opacity-60"
          >
            {saving ? "저장 중..." : "등록하기"}
          </button>
        </form>
      </div>
    </main>
  );
}