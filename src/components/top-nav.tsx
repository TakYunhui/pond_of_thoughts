import Link from "next/link";
import { signOutAction } from "@/app/login/actions";
import { type Profile } from "@/lib/types";

type TopNavProps = {
  viewer: Profile | null;
  demoMode: boolean;
};

export function TopNav({ viewer, demoMode }: TopNavProps) {
  return (
    <header className="sticky top-0 z-20">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-6 sm:px-8 lg:px-10">
        <div className="flex items-center gap-5">
          <Link
            href="/"
            className="display-font text-[1.7rem] font-medium text-[var(--accent)] sm:text-[2rem]"
          >
            사유의 연못
          </Link>
          <nav className="hidden items-center gap-7 text-[11px] uppercase tracking-[0.24em] text-[var(--muted)] md:flex">
            <Link href="/questions" className="hover:text-[var(--accent)]">
              질문
            </Link>
            <Link href="/me" className="hover:text-[var(--accent)]">
              내 기록
            </Link>
            <Link href="/login" className="hover:text-[var(--accent)]">
              로그인
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {demoMode ? (
            <span className="rounded-full bg-[rgba(244,195,119,0.08)] px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[var(--accent)]">
              demo
            </span>
          ) : null}
          {viewer ? (
            <>
              <span className="hidden rounded-full bg-white/[0.04] px-3 py-1 text-xs tracking-[0.14em] text-[var(--muted)] sm:inline-flex">
                {viewer.nickname}
              </span>
              <form action={signOutAction}>
                <button
                  type="submit"
                  className="pond-button rounded-full px-4 py-2 text-[11px] font-medium"
                >
                  나가기
                </button>
              </form>
            </>
          ) : (
            <Link
              href="/login"
              className="pond-button rounded-full px-4 py-2 text-[11px] font-medium"
            >
              로그인
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
