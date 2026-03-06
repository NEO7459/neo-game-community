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
    <main className="relative min-h-screen overflow-hidden bg-[#050b16] text-white">
      <div className="animated-bg" />
      <div className="animated-grid" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.12),transparent_28%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.12),transparent_28%),radial-gradient(circle_at_bottom,rgba(236,72,153,0.10),transparent_32%)]" />

      <header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-lg font-black text-cyan-300 shadow-[0_0_25px_rgba(56,189,248,0.25)] backdrop-blur-md">
            N
          </div>
          <div>
            <p className="text-lg font-bold tracking-wide">NEO GAME COMMUNITY</p>
            <p className="text-xs text-slate-400">NEXT GEN COMMUNITY PLATFORM</p>
          </div>
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/" className="text-sm font-medium text-slate-300 transition hover:text-cyan-300">
            홈
          </Link>
          <Link href="/notice" className="text-sm font-medium text-slate-300 transition hover:text-cyan-300">
            공지사항
          </Link>
          <Link href="/party" className="text-sm font-medium text-slate-300 transition hover:text-cyan-300">
            파티 모집
          </Link>
          <Link href="/free" className="text-sm font-medium text-slate-300 transition hover:text-cyan-300">
            자유게시판
          </Link>
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
                className="rounded-xl bg-gradient-to-r from-cyan-400 to-sky-300 px-4 py-2 text-sm font-bold text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.35)] transition hover:scale-105"
              >
                회원가입
              </Link>
            </>
          )}

          {!loading && displayName && (
            <>
              <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-300">
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
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-300 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee]" />
              FUTURE DIGITAL HUB
            </div>

            <h1 className="mt-6 text-5xl font-black leading-tight md:text-7xl">
              <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-violet-400 bg-clip-text text-transparent">
                NEXT
              </span>
              <br />
              <span>COMMUNITY,</span>
              <br />
              <span className="bg-gradient-to-r from-fuchsia-400 via-violet-400 to-cyan-300 bg-clip-text text-transparent">
                REAL TIME
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300 md:text-xl">
              네오 게임 커뮤니티는 공지, 파티 모집, 자유게시판, 디스코드 연결을
              한곳에 모은 미래형 게임 커뮤니티 플랫폼입니다.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/party"
                className="rounded-2xl bg-gradient-to-r from-cyan-400 to-sky-300 px-7 py-4 text-base font-bold text-slate-950 shadow-[0_0_30px_rgba(34,211,238,0.35)] transition hover:scale-105"
              >
                파티 모집 보기
              </Link>
              <Link
                href="/free"
                className="rounded-2xl border border-white/15 bg-white/5 px-7 py-4 text-base font-semibold backdrop-blur-md transition hover:bg-white/10"
              >
                자유게시판 가기
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <span className="rounded-full border border-violet-400/30 bg-violet-400/10 px-4 py-2 text-sm text-violet-200">
                ⚡ 실시간 커뮤니티
              </span>
              <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
                🛰 디스코드 연결
              </span>
              <span className="rounded-full border border-pink-400/30 bg-pink-400/10 px-4 py-2 text-sm text-pink-200">
                💬 자유 소통
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-2 rounded-[32px] bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-fuchsia-500/20 blur-2xl" />
            <div className="relative rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-2xl">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">SYSTEM STATUS</p>
                  <h2 className="text-2xl font-bold text-white">COMMUNITY CORE</h2>
                </div>
                <div className="rounded-full bg-emerald-400/15 px-3 py-1 text-sm font-semibold text-emerald-300">
                  ● ONLINE
                </div>
              </div>

              <div className="grid gap-4">
                <Link href="/notice" className="rounded-2xl border border-cyan-400/20 bg-slate-950/60 p-5 transition hover:scale-[1.02] hover:border-cyan-400/40">
                  <p className="text-lg font-bold">📢 공지사항</p>
                  <p className="mt-2 text-sm text-slate-400">
                    운영 공지와 주요 안내를 확인할 수 있습니다.
                  </p>
                </Link>

                <Link href="/party" className="rounded-2xl border border-violet-400/20 bg-slate-950/60 p-5 transition hover:scale-[1.02] hover:border-violet-400/40">
                  <p className="text-lg font-bold">🎮 파티 모집</p>
                  <p className="mt-2 text-sm text-slate-400">
                    게임별 모집글과 디스코드 링크를 바로 확인할 수 있습니다.
                  </p>
                </Link>

                <Link href="/free" className="rounded-2xl border border-pink-400/20 bg-slate-950/60 p-5 transition hover:scale-[1.02] hover:border-pink-400/40">
                  <p className="text-lg font-bold">📝 자유게시판</p>
                  <p className="mt-2 text-sm text-slate-400">
                    네이버 카페 스타일의 자유 소통 게시판입니다.
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}