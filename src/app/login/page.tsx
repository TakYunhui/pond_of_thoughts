import { Mail, MoonStar, Sparkles } from "lucide-react";
import { SectionCard } from "@/components/section-card";
import { SubmitButton } from "@/components/submit-button";
import { getCurrentViewer, isDemoMode } from "@/lib/data";
import { loginAction, signupAction } from "./actions";

type LoginPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const [viewer, demoMode, resolvedSearchParams] = await Promise.all([
    getCurrentViewer(),
    isDemoMode(),
    searchParams,
  ]);

  const message = resolvedSearchParams.message;
  const statusMessage = Array.isArray(message) ? message[0] : message;

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-5 py-10 sm:px-8">
      <section className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(320px,420px)]">
        <SectionCard className="rounded-[2rem] p-8 sm:p-10">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
              <MoonStar className="h-3.5 w-3.5 text-[var(--accent)]" />
              Auth
            </div>
            <div className="space-y-3">
              <h1 className="display-font text-4xl font-semibold text-white">사유에 들어가기</h1>
              <p className="max-w-xl text-base leading-8 text-[var(--muted)]">
                이메일 로그인만으로 충분하다. 로그인 후 질문을 남기고, 다른 사유에서 다시
                이어 쓸 수 있다.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/10 p-5">
                <p className="text-sm text-white">이 프로젝트는 Supabase Auth 기반이다.</p>
                <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                  이메일 로그인과 회원가입을 기본으로 둔다.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/10 p-5">
                <p className="text-sm text-white">프로필은 가입 직후 자동 생성한다.</p>
                <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                  `nickname`이 없으면 이메일 앞부분을 기본 표시값으로 쓴다.
                </p>
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard className="rounded-[2rem] p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-2xl bg-[var(--accent-soft)] p-3 text-[var(--accent)]">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <h2 className="display-font text-2xl font-semibold text-white">로그인 / 가입</h2>
              <p className="text-sm text-[var(--muted)]">
                {viewer ? `${viewer.nickname}으로 이미 들어와 있다.` : "조용히 시작하면 된다."}
              </p>
            </div>
          </div>

          {statusMessage ? (
            <div className="mb-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-[var(--muted)]">
              {statusMessage}
            </div>
          ) : null}

          {demoMode ? (
            <div className="mb-4 rounded-2xl border border-[var(--accent-soft)] bg-[var(--accent-soft)] px-4 py-3 text-sm text-[var(--accent)]">
              `.env.local`에 Supabase 값을 넣기 전까지는 데모 모드로만 보인다.
            </div>
          ) : null}

          <div className="grid gap-4">
            <form action={loginAction} className="space-y-3">
              <label className="block space-y-2">
                <span className="text-sm text-[var(--muted)]">이메일</span>
                <input
                  name="email"
                  type="email"
                  required
                  disabled={demoMode}
                  className="w-full rounded-2xl border border-white/10 bg-black/15 px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-[var(--accent)]"
                  placeholder="pond@example.com"
                />
              </label>
              <label className="block space-y-2">
                <span className="text-sm text-[var(--muted)]">비밀번호</span>
                <input
                  name="password"
                  type="password"
                  required
                  disabled={demoMode}
                  className="w-full rounded-2xl border border-white/10 bg-black/15 px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-[var(--accent)]"
                  placeholder="비밀번호"
                />
              </label>
              <SubmitButton
                className="w-full rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[#1b1408]"
                pendingLabel="들어가는 중..."
                disabled={demoMode}
              >
                로그인
              </SubmitButton>
            </form>

            <div className="flex items-center gap-3 py-1">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">or</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <form action={signupAction} className="space-y-3">
              <label className="block space-y-2">
                <span className="text-sm text-[var(--muted)]">닉네임</span>
                <input
                  name="nickname"
                  type="text"
                  required
                  disabled={demoMode}
                  className="w-full rounded-2xl border border-white/10 bg-black/15 px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-[var(--accent)]"
                  placeholder="잔잔한 사람"
                />
              </label>
              <label className="block space-y-2">
                <span className="text-sm text-[var(--muted)]">이메일</span>
                <input
                  name="email"
                  type="email"
                  required
                  disabled={demoMode}
                  className="w-full rounded-2xl border border-white/10 bg-black/15 px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-[var(--accent)]"
                  placeholder="pond@example.com"
                />
              </label>
              <label className="block space-y-2">
                <span className="text-sm text-[var(--muted)]">비밀번호</span>
                <input
                  name="password"
                  type="password"
                  required
                  disabled={demoMode}
                  className="w-full rounded-2xl border border-white/10 bg-black/15 px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-[var(--accent)]"
                  placeholder="비밀번호"
                />
              </label>
              <SubmitButton
                className="w-full rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white"
                pendingLabel="가입 중..."
                disabled={demoMode}
              >
                회원가입
              </SubmitButton>
            </form>

            <div className="rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-sm text-[var(--muted)]">
              <div className="mb-2 flex items-center gap-2 text-white">
                <Sparkles className="h-4 w-4 text-[var(--accent)]" />
                초기 메모
              </div>
              Google OAuth는 나중에 붙일 수 있게 구조만 열어둔 상태다.
            </div>
          </div>
        </SectionCard>
      </section>
    </main>
  );
}
