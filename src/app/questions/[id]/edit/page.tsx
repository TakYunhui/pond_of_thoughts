import { notFound } from "next/navigation";
import { QuestionForm } from "@/components/forms/question-form";
import { SectionCard } from "@/components/section-card";
import { getCurrentViewer, getQuestionById, isDemoMode } from "@/lib/data";
import { updateQuestionAction } from "../../actions";

type EditQuestionPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditQuestionPage({ params }: EditQuestionPageProps) {
  const { id } = await params;
  const [viewer, questionDetail, demoMode] = await Promise.all([
    getCurrentViewer(),
    getQuestionById(id),
    isDemoMode(),
  ]);

  if (!questionDetail) {
    notFound();
  }

  const disabled =
    demoMode || !viewer || questionDetail.question.author.id !== viewer.id;

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-5 py-10 sm:px-8">
      <SectionCard className="rounded-[2rem] p-8">
        <h1 className="display-font text-3xl font-semibold text-white">물음 다듬기</h1>
        <p className="mt-3 text-base leading-8 text-[var(--muted)]">
          물음의 중심은 그대로 두되, 표현이 너무 닫혀 있다면 조금 풀어도 된다.
        </p>
      </SectionCard>

      <QuestionForm
        action={updateQuestionAction}
        submitLabel="다듬어 두기"
        initialQuestion={questionDetail.question}
        hiddenQuestionId={questionDetail.question.id}
        disabled={disabled}
        disabledReason={
          demoMode
            ? "데모 모드에서는 수정이 막혀 있다."
            : "남긴 본인만 물음을 다듬을 수 있다."
        }
      />
    </main>
  );
}
