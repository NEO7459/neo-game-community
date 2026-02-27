"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage("로그인 실패: " + error.message);
      return;
    }

    setMessage("로그인 성공!");
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-[#050816] text-white flex items-center justify-center px-6">
      <section className="w-full max-w-md rounded-[28px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl">
        <div className="mb-6">
          <p className="text-sm font-semibold tracking-[0.2em] text-sky-300">
            NEO GAME COMMUNITY
          </p>
          <h1 className="mt-3 text-3xl font-black">로그인</h1>
          <p className="mt-2 text-sm text-slate-400">
            가입한 계정으로 로그인해서 커뮤니티에 입장하세요.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              이메일
            </label>
            <input
              type="email"
              placeholder="이메일 입력"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-sky-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              비밀번호
            </label>
            <input
              type="password"
              placeholder="비밀번호 입력"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-sky-400"
            />
          </div>

          {message && (
            <p className="text-sm text-sky-300">{message}</p>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-sky-400 to-cyan-300 px-4 py-3 font-bold text-slate-950 shadow-[0_0_25px_rgba(56,189,248,0.35)] transition hover:scale-[1.02]"
          >
            로그인 하기
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-400">
          계정이 없나요?{" "}
          <Link
            href="/signup"
            className="font-semibold text-sky-300 hover:text-sky-200"
          >
            회원가입 하러가기
          </Link>
        </div>
      </section>
    </main>
  );
}