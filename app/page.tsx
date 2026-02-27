"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";

export default function Home() {
  const supabase = createClient();

  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const nickname = user.user_metadata?.nickname;
        const emailName = user.email?.split("@")[0];
        setDisplayName(nickname || emailName || "");
      }

      setLoading(false);
    };

    getUser();
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_30%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.18),transparent_30%),radial-gradient(circle_at_bottom,rgba(236,72,153,0.16),transparent_35%)]" />
      <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" />
      <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl" />
      <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />

      <header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-fuchsia-500 text-lg font-black text-slate-950 shadow-[0_0_25px_rgba(56,189,248,0.35)]">
            N
          </div>
          <div>
            <p className="text-lg font-bold tracking-wide">NEO GAME COMMUNITY</p>
            <p className="text-xs text-slate-400">FPS · MOBA · PARTY · COMMUNITY</p>
          </div>
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          <a href="#" className="text-sm font-medium text-slate-300 transition hover:text-sky-300">
            홈
          </a>
          <Link
            href="/notice"
            className="text-sm font-medium text-slate-300 transition hover:text-sky-300"
          >
           공지사항
          </Link>
          <a href="#" className="text-sm font-medium text-slate-300 transition hover:text-sky-300">
            파티 모집
          </a>
          <a href="#" className="text-sm font-medium text-slate-300 transition hover:text-sky-300">
            자유게시판
          </a>
        </nav>

        <div className="flex items-center gap-3">
          {!loading && !displayName && (
            <>
              <Link
                href="/login"
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/10"
              >
                로그인
              </Link>
              <Link
                href="/signup"
                className="rounded-xl bg-gradient-to-r from-sky-400 to-cyan-300 px-4 py-2 text-sm font-bold text-slate-950 shadow-[0_0_20px_rgba(56,189,248,0.35)] transition hover:scale-105"
              >
                회원가입
              </Link>
            </>
          )}

          {!loading && displayName && (
            <>
              <div className="rounded-xl border border-sky-400/20 bg-sky-400/10 px-4 py-2 text-sm font-semibold text-sky-300">
                {displayName}님 환영합니다
              </div>
              <button
                onClick={handleLogout}
                className="rounded-xl bg-gradient-to-r from-rose-400 to-pink-400 px-4 py-2 text-sm font-bold text-slate-950 shadow-[0_0_20px_rgba(251,113,133,0.35)] transition hover:scale-105"
              >
                로그아웃
              </button>
            </>
          )}
        </div>
      </header>

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-88px)] max-w-7xl items-center px-6 pb-16 pt-6">
        <div className="grid w-full items-center gap-10 lg:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-2 text-sm font-semibold text-sky-300 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_12px_#38bdf8]" />
              NEO GAME COMMUNITY
            </div>

            <h1 className="mt-6 text-5xl font-black leading-tight md:text-7xl">
              <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-fuchsia-400 bg-clip-text text-transparent">
                PLAY
              </span>
              <br />
              <span>TOGETHER,</span>
              <br />
              <span className="bg-gradient-to-r from-fuchsia-400 via-violet-400 to-sky-400 bg-clip-text text-transparent">
                CONNECT
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300 md:text-xl">
              발로란트, 배틀그라운드, 리그 오브 레전드, 레인보우식스 시즈를
              함께 즐기는 네오 게임 커뮤니티. 파티 모집, 내전, 공지, 자유 소통까지
              한곳에서.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -inset-2 rounded-[32px] bg-gradient-to-r from-sky-500/30 via-violet-500/30 to-fuchsia-500/30 blur-2xl" />
            <div className="relative rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-2xl">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">커뮤니티 현황</p>
                  <h2 className="text-2xl font-bold text-white">LIVE GAME BOARD</h2>
                </div>
                <div className="rounded-full bg-emerald-400/15 px-3 py-1 text-sm font-semibold text-emerald-300">
                  ● ONLINE
                </div>
              </div>

              <div className="grid gap-4">
                <div className="rounded-2xl border border-sky-400/20 bg-slate-950/60 p-5">
                  <p className="text-lg font-bold">🎯 발로란트</p>
                  <p className="mt-2 text-sm text-slate-400">경쟁전 / 일반 / 내전 / 스크림 멤버 모집</p>
                </div>
                <div className="rounded-2xl border border-violet-400/20 bg-slate-950/60 p-5">
                  <p className="text-lg font-bold">🔥 배틀그라운드</p>
                  <p className="mt-2 text-sm text-slate-400">듀오 / 스쿼드 / 랭크 / 디스코드 보이스 플레이</p>
                </div>
                <div className="rounded-2xl border border-pink-400/20 bg-slate-950/60 p-5">
                  <p className="text-lg font-bold">⚔️ 리그 오브 레전드</p>
                  <p className="mt-2 text-sm text-slate-400">자유랭 / 솔랭 / 칼바람 / 내전 팀원 모집</p>
                </div>
                <div className="rounded-2xl border border-cyan-400/20 bg-slate-950/60 p-5">
                  <p className="text-lg font-bold">🛡️ 레인보우식스 시즈</p>
                  <p className="mt-2 text-sm text-slate-400">팀플레이 / 전략 공유 / 랭크 멤버 모집</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}