import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FloatingQuestionNode } from "@/components/floating-question-node";
import { PondBackdrop } from "@/components/pond-backdrop";
import { getCurrentViewer, getQuestions } from "@/lib/data";

const desktopNodes = [
  {
    className: "left-[6%] top-[50%] float-drift pond-emerge",
    textSide: "right" as const,
  },
  {
    className: "right-[10%] top-[58%] float-drift pond-emerge [animation-delay:1.8s]",
    textSide: "left" as const,
  },
  {
    className: "left-[16%] top-[82%] float-drift pond-emerge [animation-delay:3.6s]",
    textSide: "right" as const,
  },
] as const;

export default async function Home() {
  const [viewer, questions] = await Promise.all([getCurrentViewer(), getQuestions(4)]);

  return (
    <main className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col px-5 pb-16 pt-6 sm:px-8 lg:px-10">
      <section className="pond-landing relative px-2 pb-10 sm:px-4 lg:min-h-[58rem]">
        <PondBackdrop />

        <div className="absolute inset-0 z-0 hidden lg:block">
          {questions.map((question, index) => (
            <FloatingQuestionNode
              key={question.id}
              question={question}
              className={desktopNodes[index]?.className ?? desktopNodes[0].className}
              delayMs={index * 180}
              textSide={desktopNodes[index]?.textSide ?? "right"}
              active={false}
            />
          ))}
        </div>

        <div className="pond-hero-copy relative z-10 mx-auto flex max-w-3xl flex-col items-center px-4 pt-14 text-center sm:px-6 sm:pt-20">
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
            점 위에 머물면 물결과 함께 질문이 떠오른다
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
      </section>
    </main>
  );
}
