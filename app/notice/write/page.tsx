import Link from "next/link";

export default function NoticeWritePage() {
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

        <form className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              제목
            </label>
            <input
              type="text"
              placeholder="공지 제목 입력"
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
              className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none placeholder:text-slate-500"
            />
          </div>

          <button
            type="button"
            className="rounded-xl bg-gradient-to-r from-sky-400 to-cyan-300 px-5 py-3 font-bold text-slate-950"
          >
            공지 등록
          </button>
        </form>
      </div>
    </main>
  );
}