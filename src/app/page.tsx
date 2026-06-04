import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FloatingQuestionNode } from "@/components/floating-question-node";
import { PondBackdrop } from "@/components/pond-backdrop";
import { getCurrentViewer, getQuestions, isDemoMode } from "@/lib/data";

const desktopPositions = [
  "left-[8%] top-[20%] w-[18rem]",
  "right-[10%] top-[30%] w-[20rem]",
  "left-[22%] bottom-[11%] w-[16rem]",
  "right-[26%] bottom-[18%] w-[18rem]",
] as const;

export default async function Home() {
  const [viewer, questions, demoMode] = await Promise.all([
    getCurrentViewer(),
    getQuestions(4),
    isDemoMode(),
  ]);

  return (
    <main className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col px-5 pb-12 pt-4 sm:px-8 lg:px-10">
      <section className="relative min-h-[calc(100vh-7rem)] overflow-hidden rounded-[2.5rem] border border-white/[0.04] bg-[linear-gradient(180deg,rgba(7,17,26,0.18),rgba(7,17,26,0.04))]">
        <PondBackdrop />

        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-4 pt-14 text-center sm:px-6 sm:pt-20">
          <span className="mb-6 text-[10px] uppercase tracking-[0.34em] text-[var(--muted)]">
            contemplative question archive
          </span>
          <h1 className="display-font max-w-4xl text-[2.8rem] leading-[1.12] font-medium text-[var(--foreground)] sm:text-[4rem]">
            질문은 물 위에 남고
            <br />
            사유는 잔물결처럼 번진다
          </h1>
          <p className="mt-6 max-w-2xl text-sm leading-8 text-[var(--muted)] sm:text-base">
            빠르게 답을 내리기보다 오래 바라보는 질문들을 남긴다. 사유는 댓글이 아니라
            노드가 되고, 다른 사유에서 다시 조용히 파생된다.
          </p>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
            <Link
              href="/questions"
              className="pond-button inline-flex items-center gap-2 rounded-full px-6 py-3 text-[11px] font-medium"
            >
              질문의 수면 보기
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={viewer ? "/questions/new" : "/login"}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-[11px] uppercase tracking-[0.2em] text-[var(--muted)] hover:border-[var(--border-strong)] hover:text-[var(--accent)]"
            >
              질문 남기기
            </Link>
          </div>
        </div>

        <div className="relative z-10 hidden min-h-[34rem] lg:block">
          {questions.map((question, index) => (
            <FloatingQuestionNode
              key={question.id}
              question={question}
              className={desktopPositions[index] ?? desktopPositions[0]}
              delayMs={index * 130}
              active={index === 0}
            />
          ))}
        </div>

        <div className="relative z-10 mt-14 grid gap-3 px-4 pb-8 sm:px-6 lg:hidden">
          {questions.map((question, index) => (
            <FloatingQuestionNode
              key={question.id}
              question={question}
              compact
              className="w-full"
              delayMs={index * 70}
              active={index === 0}
            />
          ))}
        </div>

        <div className="relative z-10 mt-6 grid gap-4 border-t border-white/[0.05] px-4 py-8 sm:grid-cols-3 sm:px-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--muted)]">Mode</p>
            <p className="mt-2 text-sm text-[var(--foreground)]">
              {demoMode ? "목업 데이터 기반 미리보기" : "실제 Supabase 연결 상태"}
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--muted)]">Viewer</p>
            <p className="mt-2 text-sm text-[var(--foreground)]">
              {viewer ? `${viewer.nickname}로 들어와 있음` : "아직 로그인 전 상태"}
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--muted)]">Structure</p>
            <p className="mt-2 text-sm text-[var(--foreground)]">질문 → 사유 → 파생 사유</p>
          </div>
        </div>
      </section>
    </main>
  );
}
