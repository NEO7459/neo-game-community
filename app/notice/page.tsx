import Link from "next/link";
import { notices } from "@/data/notices";

export default function NoticePage() {
  return (
    <main className="min-h-screen bg-[#050816] px-6 py-12 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold tracking-[0.2em] text-sky-300">
              NEO GAME COMMUNITY
            </p>
            <h1 className="mt-3 text-4xl font-black">공지사항</h1>
            <p className="mt-2 text-slate-400">
              커뮤니티 운영 공지와 주요 안내를 확인하세요.
            </p>
          </div>

          <Link
            href="/"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            홈으로
          </Link>
        </div>

        <div className="space-y-4">
          {notices.map((notice) => (
            <Link
              key={notice.id}
              href={`/notice/${notice.id}`}
              className="block rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-sky-400/30 hover:bg-white/10"
            >
              <div className="mb-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {notice.important && (
                    <span className="rounded-full bg-rose-400/20 px-3 py-1 text-xs font-bold text-rose-300">
                      중요
                    </span>
                  )}
                  <h2 className="text-xl font-bold">{notice.title}</h2>
                </div>
                <span className="text-sm text-slate-400">{notice.date}</span>
              </div>

              <p className="leading-7 text-slate-300">{notice.content}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}