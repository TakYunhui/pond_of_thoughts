import Link from "next/link";
import { NotebookPen, Waves } from "lucide-react";
import { QuestionList } from "@/components/question-list";
import { SectionCard } from "@/components/section-card";
import { getCurrentViewer, getMePageData, isDemoMode } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export default async function MePage() {
  const [viewer, pageData, demoMode] = await Promise.all([
    getCurrentViewer(),
    getMePageData(),
    isDemoMode(),
  ]);

  if (!viewer && !demoMode) {
    return (
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-5 py-10 sm:px-8">
        <SectionCard className="rounded-[2rem] p-8">
          <h1 className="display-font text-3xl font-semibold text-white">내 기록 보기</h1>
          <p className="mt-3 text-base leading-8 text-[var(--muted)]">
            이 페이지는 로그인 뒤에 열린다.
          </p>
          <Link
            href="/login"
            className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[#1b1408]"
          >
            로그인하러 가기
          </Link>
        </SectionCard>
      </main>
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-5 py-10 sm:px-8 lg:px-10">
      <section className="grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
        <SectionCard className="rounded-[2rem] p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">내 자리</p>
              <h1 className="display-font mt-2 text-3xl font-semibold text-white">
                {pageData.viewer?.nickname ?? "내 기록"}
              </h1>
            </div>
            {demoMode ? (
              <span className="rounded-full border border-[var(--accent-soft)] bg-[var(--accent-soft)] px-3 py-1 text-xs text-[var(--accent)]">
                demo
              </span>
            ) : null}
          </div>
          <div className="mt-6 grid gap-4">
            <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">내 물음</p>
              <p className="mt-2 text-2xl text-white">{pageData.myQuestions.length}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">내 사유</p>
              <p className="mt-2 text-2xl text-white">{pageData.myThoughts.length}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">최근 손질</p>
              <p className="mt-2 text-sm text-white">
                {pageData.recentThoughts[0]
                  ? formatDate(pageData.recentThoughts[0].updatedAt)
                  : "아직 없다"}
              </p>
            </div>
          </div>
        </SectionCard>

        <div className="grid gap-6">
          <QuestionList
            title="내가 남긴 물음"
            description="내가 중심에 남겨 둔 물음들"
            questions={pageData.myQuestions}
            emptyMessage="아직 남긴 물음이 없다."
          />

          <SectionCard className="rounded-[2rem] p-6">
            <div className="mb-4 flex items-center gap-2">
              <NotebookPen className="h-5 w-5 text-[var(--accent)]" />
              <h2 className="display-font text-2xl font-semibold text-white">내가 남긴 사유</h2>
            </div>
            <div className="grid gap-3">
              {pageData.myThoughts.map((thought) => (
                <article
                  key={thought.id}
                  className="rounded-2xl border border-white/10 bg-black/10 p-4"
                >
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <p className="text-sm text-white">{thought.author.nickname}</p>
                    <p className="text-xs text-[var(--muted)]">{formatDate(thought.createdAt)}</p>
                  </div>
                  <p className="text-sm leading-7 text-[var(--muted)]">{thought.content}</p>
                  <Link
                    href={`/questions/${thought.questionId}`}
                    className="mt-3 inline-flex items-center gap-2 text-sm text-[var(--accent)]"
                  >
                    <Waves className="h-4 w-4" />
                    물음으로 이동
                  </Link>
                </article>
              ))}
              {pageData.myThoughts.length === 0 ? (
                <p className="rounded-2xl border border-dashed border-white/10 px-4 py-5 text-sm text-[var(--muted)]">
                  아직 남긴 사유가 없다.
                </p>
              ) : null}
            </div>
          </SectionCard>
        </div>
      </section>
    </main>
  );
}
