import Link from "next/link";

const notices = [
  {
    id: 1,
    title: "네오 게임 커뮤니티 정식 오픈 안내",
    date: "2026-02-27",
    content:
      "네오 게임 커뮤니티가 정식 오픈했습니다. 자유롭게 가입하고 파티 모집 및 소통에 참여해주세요.",
    important: true,
  },
  {
    id: 2,
    title: "디스코드 이용 규칙 안내",
    date: "2026-02-27",
    content:
      "욕설, 도배, 분쟁 유도 행위는 제재 대상입니다. 모두가 편하게 이용할 수 있도록 협조 부탁드립니다.",
    important: false,
  },
  {
    id: 3,
    title: "주말 발로란트 내전 멤버 모집",
    date: "2026-02-27",
    content:
      "이번 주말 저녁 발로란트 내전 멤버를 모집합니다. 실력 무관, 매너 플레이 환영합니다.",
    important: false,
  },
];

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
            <article
              key={notice.id}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
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
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}