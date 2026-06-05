import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FloatingQuestionNode } from "@/components/floating-question-node";
import { PondBackdrop } from "@/components/pond-backdrop";
import { getCurrentViewer, getQuestions, isDemoMode } from "@/lib/data";

const desktopPositions = [
  "left-[9%] top-[34%] float-drift",
  "right-[12%] top-[42%] float-drift [animation-delay:1.8s]",
  "left-[18%] top-[61%] float-drift [animation-delay:3.6s]",
] as const;

export default async function Home() {
  const [viewer, questions, demoMode] = await Promise.all([
    getCurrentViewer(),
    getQuestions(4),
    isDemoMode(),
  ]);

  return (
    <main className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col px-5 pb-16 pt-6 sm:px-8 lg:px-10">
      <section className="relative overflow-hidden rounded-[2.75rem] px-2 pb-12 sm:px-4 lg:min-h-[62rem]">
        <PondBackdrop />

        <div className="absolute inset-0 z-0 hidden lg:block">
          {questions.map((question, index) => (
            <FloatingQuestionNode
              key={question.id}
              question={question}
              className={desktopPositions[index] ?? desktopPositions[0]}
              delayMs={index * 180}
              active={false}
            />
          ))}
        </div>

        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-4 pt-14 text-center sm:px-6 sm:pt-20">
          <span className="mb-6 text-[10px] uppercase tracking-[0.34em] text-[var(--muted)]">
            고요한 질문 보관소
          </span>
          <h1 className="display-font max-w-4xl text-[2.8rem] leading-[1.12] font-medium text-[var(--foreground)] sm:text-[4.2rem]">
            질문은 물 위에 남고
            <br />
            사유는 잔물결처럼 번진다
          </h1>
          <p className="mt-6 max-w-2xl text-sm leading-8 text-[var(--muted)] sm:text-base">
            빠르게 답을 내리기보다 오래 바라보는 질문을 남긴다. 수면 위의 작은 흔적을
            건드리면 질문이 떠오르고, 클릭하면 더 깊은 사유의 흐름으로 들어간다.
          </p>
          <p className="mt-4 hidden text-[11px] uppercase tracking-[0.28em] text-[rgba(217,228,239,0.42)] lg:block">
            수면 위의 점을 건드리면 질문이 떠오른다
          </p>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
            <Link
              href="/questions"
              className="pond-button inline-flex items-center gap-2 rounded-full px-6 py-3 text-[11px] font-medium"
            >
              질문 둘러보기
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={viewer ? "/questions/new" : "/login"}
              className="inline-flex items-center gap-2 rounded-full bg-white/[0.03] px-6 py-3 text-[11px] uppercase tracking-[0.2em] text-[var(--muted)] hover:bg-white/[0.05] hover:text-[var(--accent)]"
            >
              질문 남기기
            </Link>
          </div>
        </div>

        <div className="relative z-10 mt-12 grid gap-5 px-4 pb-8 sm:px-6 lg:hidden">
          {questions.map((question, index) => (
            <FloatingQuestionNode
              key={question.id}
              question={question}
              compact
              active={index === 0}
              className="w-full"
              delayMs={index * 90}
            />
          ))}
        </div>

        <div className="relative z-10 mt-8 grid gap-6 px-4 py-8 sm:grid-cols-3 sm:px-6 lg:mt-[26rem]">
          <div>
            <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--muted)]">상태</p>
            <p className="mt-2 text-sm text-[var(--foreground)]">
              {demoMode ? "목업 데이터 기반 미리보기" : "실제 Supabase 연결 상태"}
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--muted)]">사용자</p>
            <p className="mt-2 text-sm text-[var(--foreground)]">
              {viewer ? `${viewer.nickname}로 들어와 있음` : "아직 로그인 전 상태"}
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--muted)]">구조</p>
            <p className="mt-2 text-sm text-[var(--foreground)]">질문 → 사유 → 파생 사유</p>
          </div>
        </div>
      </section>
    </main>
  );
}
