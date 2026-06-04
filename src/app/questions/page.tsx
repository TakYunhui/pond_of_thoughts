import Link from "next/link";
import { CirclePlus } from "lucide-react";
import { QuestionList } from "@/components/question-list";
import { SectionCard } from "@/components/section-card";
import { getCurrentViewer, getQuestions, isDemoMode } from "@/lib/data";

export default async function QuestionsPage() {
  const [viewer, questions, demoMode] = await Promise.all([
    getCurrentViewer(),
    getQuestions(),
    isDemoMode(),
  ]);

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-5 py-10 sm:px-8 lg:px-10">
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <QuestionList
          title="질문의 수면"
          description="지금 남아 있는 질문들의 목록"
          questions={questions}
          emptyMessage="아직 남은 질문이 없다."
          action={
            <Link
              href={viewer ? "/questions/new" : "/login"}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <CirclePlus className="h-4 w-4" />
              질문 남기기
            </Link>
          }
        />

        <SectionCard className="rounded-[2rem] p-6">
          <h2 className="display-font text-xl font-semibold text-white">안내</h2>
          <div className="mt-4 space-y-3 text-sm leading-7 text-[var(--muted)]">
            <p>질문은 사유의 시작점이다. 답을 빠르게 유도하지 않는 질문이 잘 맞는다.</p>
            <p>출처는 직접 입력한다. 도서 API 같은 자동 연동은 아직 없다.</p>
            {demoMode ? <p>현재는 데모 모드라서 목록이 목업 데이터로 보인다.</p> : null}
          </div>
        </SectionCard>
      </section>
    </main>
  );
}
