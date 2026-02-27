"use client";

import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/lib/supabase";

export default function SignupPage() {
  const supabase = createClient();

  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nickname || !email || !password) {
      setMessage("닉네임, 이메일, 비밀번호를 모두 입력해주세요.");
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nickname,
        },
      },
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("회원가입이 완료되었습니다. 이메일 인증이 설정되어 있다면 메일을 확인해주세요.");
    setNickname("");
    setEmail("");
    setPassword("");
  };

  return (
    <main className="min-h-screen bg-[#050816] text-white flex items-center justify-center px-6">
      <section className="w-full max-w-md rounded-[28px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl">
        <div className="mb-6">
          <p className="text-sm font-semibold tracking-[0.2em] text-sky-300">
            NEO GAME COMMUNITY
          </p>
          <h1 className="mt-3 text-3xl font-black">회원가입</h1>
          <p className="mt-2 text-sm text-slate-400">
            커뮤니티에 가입하고 파티 모집과 소통에 참여해보세요.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSignup}>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              닉네임
            </label>
            <input
              type="text"
              placeholder="닉네임 입력"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-sky-400"
            />
          </div>

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

          {message && <p className="text-sm text-sky-300">{message}</p>}

          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-sky-400 to-cyan-300 px-4 py-3 font-bold text-slate-950 shadow-[0_0_25px_rgba(56,189,248,0.35)] transition hover:scale-[1.02]"
          >
            회원가입 하기
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-400">
          이미 계정이 있나요?{" "}
          <Link href="/login" className="font-semibold text-sky-300 hover:text-sky-200">
            로그인 하러가기
          </Link>
        </div>
      </section>
    </main>
  );
}