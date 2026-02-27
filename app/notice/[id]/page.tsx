import Link from "next/link";
import { notFound } from "next/navigation";
import { notices } from "@/data/notices";

type NoticeDetailPageProps = {
  params: {
    id: string;
  };
};

export default function NoticeDetailPage({ params }: NoticeDetailPageProps) {
  const notice = notices.find((item) => String(item.id) === params.id);

  if (!notice) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#050816] px-6 py-12 text-white">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/notice"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            ← 공지사항 목록
          </Link>

          <Link
            href="/"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            홈으로
          </Link>
        </div>

        <article className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <div className="mb-6 flex items-center gap-3">
            {notice.important && (
              <span className="rounded-full bg-rose-400/20 px-3 py-1 text-xs font-bold text-rose-300">
                중요
              </span>
            )}
            <span className="text-sm text-slate-400">{notice.date}</span>
          </div>

          <h1 className="text-4xl font-black leading-tight">{notice.title}</h1>

          <div className="mt-8 rounded-2xl bg-slate-950/40 p-6">
            <p className="text-lg leading-8 text-slate-200">{notice.content}</p>
          </div>
        </article>
      </div>
    </main>
  );
}