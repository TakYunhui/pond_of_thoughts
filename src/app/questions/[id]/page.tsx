import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpenText, PenLine, Trash2 } from "lucide-react";
import { ThoughtForm } from "@/components/forms/thought-form";
import { PondFlow } from "@/components/pond-flow";
import { SectionCard } from "@/components/section-card";
import { ThoughtTree } from "@/components/thought-tree";
import {
  createThoughtAction,
  softDeleteQuestionAction,
} from "@/app/questions/actions";
import { getCurrentViewer, getQuestionById, isDemoMode } from "@/lib/data";
import { formatDate } from "@/lib/utils";

type QuestionDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function QuestionDetailPage({
  params,
}: QuestionDetailPageProps) {
  const { id } = await params;
  const [viewer, questionDetail, demoMode] = await Promise.all([
    getCurrentViewer(),
    getQuestionById(id),
    isDemoMode(),
  ]);

  if (!questionDetail) {
    notFound();
  }

  const { question, thoughts } = questionDetail;
  const canEditQuestion = !!viewer && viewer.id === question.author.id && !demoMode;
  const canWriteThought = !!viewer && !demoMode;

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-5 py-10 sm:px-8 lg:px-10">
      <section className="grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
        <SectionCard className="rounded-[2.2rem] p-6">
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--muted)]">
                  Question
                </p>
                <h1 className="display-font mt-2 text-3xl leading-tight font-semibold text-[#d2c4b3]">
                  {question.title}
                </h1>
              </div>
              {demoMode ? (
                <span className="rounded-full border border-[var(--accent-soft)] px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[var(--accent)]">
                  demo
                </span>
              ) : null}
            </div>

            <p className="text-sm leading-7 text-[var(--muted)]">
              {question.description || "설명은 비워 둔 질문이다."}
            </p>

            <div className="grid gap-3 text-sm text-[var(--muted)]">
              <div className="pond-note rounded-[1.6rem] p-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">작성자</p>
                <p className="mt-2 text-white">{question.author.nickname}</p>
              </div>
              <div className="pond-note rounded-[1.6rem] p-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">출처</p>
                <p className="mt-2 text-white">
                  {question.sourceTitle ? `${question.sourceType} · ${question.sourceTitle}` : question.sourceType}
                </p>
                {question.sourceAuthor ? (
                  <p className="mt-1 text-xs text-[var(--muted)]">{question.sourceAuthor}</p>
                ) : null}
              </div>
              <div className="pond-note rounded-[1.6rem] p-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">기록</p>
                <p className="mt-2 text-white">{formatDate(question.createdAt)}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/questions"
                className="pond-button inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-medium"
              >
                <BookOpenText className="h-4 w-4" />
                목록으로
              </Link>
              {canEditQuestion ? (
                <Link
                  href={`/questions/${question.id}/edit`}
                  className="pond-button inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-medium"
                >
                  <PenLine className="h-4 w-4" />
                  질문 수정
                </Link>
              ) : null}
            </div>

            {canEditQuestion ? (
              <form action={softDeleteQuestionAction}>
                <input type="hidden" name="questionId" value={question.id} />
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full border border-[color:rgba(255,152,152,0.2)] px-4 py-2 text-[11px] uppercase tracking-[0.16em] text-[var(--danger)]"
                >
                  <Trash2 className="h-4 w-4" />
                  질문 숨기기
                </button>
              </form>
            ) : null}
          </div>
        </SectionCard>

        <ThoughtForm
          action={createThoughtAction}
          submitLabel="사유 남기기"
          questionId={question.id}
          disabled={!canWriteThought}
          disabledReason={
            demoMode
              ? "데모 모드에서는 실제 저장이 막혀 있다."
              : "로그인 후에 사유를 남길 수 있다."
          }
          title="질문에서 바로 사유 시작하기"
          description="완성된 글일 필요는 없다. 짧은 메모여도 된다."
        />
      </section>

      <section className="hidden md:block">
        <PondFlow question={question} thoughts={thoughts} />
      </section>

      <details className="md:hidden">
        <summary className="pond-button cursor-pointer rounded-full px-4 py-3 text-[11px] font-medium">
          React Flow 구조형 보기 열기
        </summary>
        <div className="pt-4">
          <PondFlow question={question} thoughts={thoughts} />
        </div>
      </details>

      <ThoughtTree
        questionId={question.id}
        thoughts={thoughts}
        currentUserId={viewer?.id ?? null}
        demoMode={demoMode}
      />
    </main>
  );
}
