import { QuestionForm } from "@/components/forms/question-form";
import { SectionCard } from "@/components/section-card";
import { getCurrentViewer, isDemoMode } from "@/lib/data";
import { createQuestionAction } from "../actions";

export default async function NewQuestionPage() {
  const [viewer, demoMode] = await Promise.all([getCurrentViewer(), isDemoMode()]);
  const disabled = demoMode || !viewer;

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-5 py-10 sm:px-8">
      <SectionCard className="rounded-[2rem] p-8">
        <h1 className="display-font text-3xl font-semibold text-white">질문을 남기기</h1>
        <p className="mt-3 text-base leading-8 text-[var(--muted)]">
          너무 빠르게 결론을 요구하지 않는 질문이 좋다. 질문 설명은 짧아도 충분하다.
        </p>
      </SectionCard>

      <QuestionForm
        action={createQuestionAction}
        submitLabel="질문 저장"
        disabled={disabled}
        disabledReason={
          demoMode
            ? "Supabase 연결 전이라 저장은 막아둔 상태다."
            : "로그인 후에 질문을 남길 수 있다."
        }
      />
    </main>
  );
}
