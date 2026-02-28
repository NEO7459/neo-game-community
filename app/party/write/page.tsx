"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase";

export default function PartyWritePage() {
  const supabase = createClient();
  const router = useRouter();

  const [game, setGame] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [discordLink, setDiscordLink] = useState("");
  const [status, setStatus] = useState("모집중");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!game.trim() || !title.trim() || !content.trim() || !discordLink.trim()) {
      setMessage("게임명, 제목, 내용, 디스코드 링크를 모두 입력해주세요.");
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

    const { error } = await supabase.from("party_posts").insert({
      game: game.trim(),
      title: title.trim(),
      content: content.trim(),
      discord_link: discordLink.trim(),
      status,
      author_email: user.email ?? null,
    });

    if (error) {
      setMessage("저장 실패: " + error.message);
      setSaving(false);
      return;
    }

    router.push("/party");
    router.refresh();
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-100 via-cyan-50 to-fuchsia-100 px-6 py-12 text-slate-900">
      <div className="mx-auto max-w-3xl rounded-[32px] border border-white/60 bg-white/70 p-8 shadow-[0_20px_60px_rgba(56,189,248,0.12)] backdrop-blur-xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold tracking-[0.2em] text-sky-600">
              NEO GAME COMMUNITY
            </p>
            <h1 className="mt-3 text-4xl font-black">파티 모집 작성</h1>
            <p className="mt-2 text-slate-600">
              원하는 게임 이름을 자유롭게 적고 디스코드 링크를 등록하세요.
            </p>
          </div>

          <Link
            href="/party"
            className="rounded-2xl border border-white/50 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-white"
          >
            목록으로
          </Link>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              게임명
            </label>
            <input
              type="text"
              placeholder="예: 오버워치 2, FC 온라인, 마인크래프트"
              value={game}
              onChange={(e) => setGame(e.target.value)}
              className="w-full rounded-2xl border border-white/60 bg-white/80 px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              제목
            </label>
            <input
              type="text"
              placeholder="예: 저녁 랭크 2명 구함"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-2xl border border-white/60 bg-white/80 px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              내용
            </label>
            <textarea
              rows={6}
              placeholder="시간, 조건, 티어, 분위기 등을 적어주세요."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full rounded-2xl border border-white/60 bg-white/80 px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              디스코드 링크
            </label>
            <input
              type="text"
              placeholder="https://discord.gg/..."
              value={discordLink}
              onChange={(e) => setDiscordLink(e.target.value)}
              className="w-full rounded-2xl border border-white/60 bg-white/80 px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              모집 상태
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-2xl border border-white/60 bg-white/80 px-4 py-3 text-slate-900 outline-none"
            >
              <option>모집중</option>
              <option>마감</option>
            </select>
          </div>

          {message && <p className="text-sm text-sky-700">{message}</p>}

          <button
            type="submit"
            disabled={saving}
            className="rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-400 px-5 py-3 font-bold text-white shadow-[0_0_25px_rgba(14,165,233,0.35)] disabled:opacity-60"
          >
            {saving ? "저장 중..." : "파티 모집 등록"}
          </button>
        </form>
      </div>
    </main>
  );
}