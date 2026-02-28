"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

export default function PartyEditPage() {
  const supabase = createClient();
  const params = useParams();
  const router = useRouter();

  const [game, setGame] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [discordLink, setDiscordLink] = useState("");
  const [status, setStatus] = useState("모집중");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  const [message, setMessage] = useState("");

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
        setGame(data.game ?? "");
        setTitle(data.title ?? "");
        setContent(data.content ?? "");
        setDiscordLink(data.discord_link ?? "");
        setStatus(data.status ?? "모집중");

        if (
          user?.email === "dogwho12@gmail.com" ||
          user?.email === data.author_email
        ) {
          setCanEdit(true);
        }
      }

      setLoading(false);
    };

    loadPost();
  }, [params, supabase]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const id = params.id as string;

    if (!game.trim() || !title.trim() || !content.trim() || !discordLink.trim()) {
      setMessage("게임명, 제목, 내용, 디스코드 링크를 모두 입력해주세요.");
      return;
    }

    setSaving(true);

    const { error } = await supabase
      .from("party_posts")
      .update({
        game: game.trim(),
        title: title.trim(),
        content: content.trim(),
        discord_link: discordLink.trim(),
        status,
      })
      .eq("id", id);

    if (error) {
      setMessage("수정 실패: " + error.message);
      setSaving(false);
      return;
    }

    router.push(`/party/${id}`);
    router.refresh();
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-sky-100 via-cyan-50 to-fuchsia-100 px-6 py-12 text-slate-900">
        <div className="mx-auto max-w-3xl">
          <p className="text-slate-500">불러오는 중...</p>
        </div>
      </main>
    );
  }

  if (!canEdit) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-sky-100 via-cyan-50 to-fuchsia-100 px-6 py-12 text-slate-900">
        <div className="mx-auto max-w-3xl rounded-[32px] border border-white/60 bg-white/70 p-8 shadow-lg backdrop-blur-xl">
          <h1 className="text-3xl font-black">수정 권한이 없습니다.</h1>

          <div className="mt-6">
            <Link
              href="/party"
              className="rounded-2xl border border-white/60 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-white"
            >
              목록으로
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-100 via-cyan-50 to-fuchsia-100 px-6 py-12 text-slate-900">
      <div className="mx-auto max-w-3xl rounded-[32px] border border-white/60 bg-white/70 p-8 shadow-[0_20px_60px_rgba(56,189,248,0.12)] backdrop-blur-xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold tracking-[0.2em] text-sky-600">
              NEO GAME COMMUNITY
            </p>
            <h1 className="mt-3 text-4xl font-black">파티 모집 수정</h1>
            <p className="mt-2 text-slate-600">
              모집글 내용을 수정할 수 있습니다.
            </p>
          </div>

          <Link
            href={`/party/${params.id as string}`}
            className="rounded-2xl border border-white/60 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-white"
          >
            상세로
          </Link>
        </div>

        <form className="space-y-4" onSubmit={handleUpdate}>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              게임명
            </label>
            <input
              type="text"
              value={game}
              onChange={(e) => setGame(e.target.value)}
              className="w-full rounded-2xl border border-white/60 bg-white/80 px-4 py-3 text-slate-900 outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              제목
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-2xl border border-white/60 bg-white/80 px-4 py-3 text-slate-900 outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              내용
            </label>
            <textarea
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full rounded-2xl border border-white/60 bg-white/80 px-4 py-3 text-slate-900 outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              디스코드 링크
            </label>
            <input
              type="text"
              value={discordLink}
              onChange={(e) => setDiscordLink(e.target.value)}
              className="w-full rounded-2xl border border-white/60 bg-white/80 px-4 py-3 text-slate-900 outline-none"
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
            className="rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-300 px-5 py-3 font-bold text-slate-900 shadow-[0_0_24px_rgba(251,191,36,0.25)] disabled:opacity-60"
          >
            {saving ? "수정 중..." : "모집글 수정"}
          </button>
        </form>
      </div>
    </main>
  );
}