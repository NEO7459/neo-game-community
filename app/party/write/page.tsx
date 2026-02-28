"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase";

export default function PartyWritePage() {
  const supabase = createClient();
  const router = useRouter();

  const [game, setGame] = useState("발로란트");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [discordLink, setDiscordLink] = useState("");
  const [status, setStatus] = useState("모집중");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!title.trim() || !content.trim() || !discordLink.trim()) {
      setMessage("게임, 제목, 내용, 디스코드 링크를 모두 입력해주세요.");
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
      game,
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
    <main className="min-h-screen bg-[#050816] px-6 py-12 text-white">
      <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold tracking-[0.2em] text-sky-300">
              NEO GAME COMMUNITY
            </p>
            <h1 className="mt-3 text-4xl font-black">파티 모집 작성</h1>
            <p className="mt-2 text-slate-400">
              게임 파티 모집 글과 디스코드 링크를 등록하세요.
            </p>
          </div>

          <Link
            href="/party"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            목록으로
          </Link>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              게임
            </label>
            <select
              value={game}
              onChange={(e) => setGame(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none"
            >
              <option>발로란트</option>
              <option>배틀그라운드</option>
              <option>리그 오브 레전드</option>
              <option>레인보우식스 시즈</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              제목
            </label>
            <input
              type="text"
              placeholder="예: 저녁 경쟁전 2명 구함"
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
              rows={6}
              placeholder="모집 조건, 시간, 티어 등을 적어주세요."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              디스코드 링크
            </label>
            <input
              type="text"
              placeholder="https://discord.gg/..."
              value={discordLink}
              onChange={(e) => setDiscordLink(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              모집 상태
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none"
            >
              <option>모집중</option>
              <option>마감</option>
            </select>
          </div>

          {message && <p className="text-sm text-sky-300">{message}</p>}

          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-gradient-to-r from-sky-400 to-cyan-300 px-5 py-3 font-bold text-slate-950 disabled:opacity-60"
          >
            {saving ? "저장 중..." : "파티 모집 등록"}
          </button>
        </form>
      </div>
    </main>
  );
}