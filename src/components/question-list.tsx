import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { type Question } from "@/lib/types";
import { formatDate, summarizeText } from "@/lib/utils";
import { SectionCard } from "@/components/section-card";

type QuestionListProps = {
  title: string;
  description: string;
  questions: Question[];
  emptyMessage: string;
  action?: React.ReactNode;
};

export function QuestionList({
  title,
  description,
  questions,
  emptyMessage,
  action,
}: QuestionListProps) {
  return (
    <SectionCard className="rounded-[2rem] p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="display-font text-2xl font-semibold text-white">{title}</h2>
          <p className="mt-1 text-sm text-[var(--muted)]">{description}</p>
        </div>
        {action}
      </div>

      <div className="mt-5 grid gap-3">
        {questions.map((question) => (
          <Link
            key={question.id}
            href={`/questions/${question.id}`}
            className="group rounded-[1.5rem] border border-white/10 bg-black/10 p-5 hover:border-[var(--accent)] hover:bg-white/[0.04]"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <p className="display-font text-xl leading-snug font-semibold text-white">
                  {question.title}
                </p>
                <p className="text-sm leading-7 text-[var(--muted)]">
                  {summarizeText(question.description || "설명이 비어 있는 질문이다.", 140)}
                </p>
              </div>
              <ArrowUpRight className="mt-1 h-5 w-5 text-[var(--muted)] group-hover:text-[var(--accent)]" />
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-[var(--muted)]">
              <span>{question.author.nickname}</span>
              <span>{formatDate(question.createdAt)}</span>
              <span>{question.sourceType}</span>
              <span>{question.visibility}</span>
            </div>
          </Link>
        ))}

        {questions.length === 0 ? (
          <p className="rounded-[1.5rem] border border-dashed border-white/10 px-4 py-6 text-sm text-[var(--muted)]">
            {emptyMessage}
          </p>
        ) : null}
      </div>
    </SectionCard>
  );
}
