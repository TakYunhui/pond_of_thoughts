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
    <SectionCard className="rounded-[2.2rem] p-6 sm:p-7">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--muted)]">물음의 결</p>
          <h2 className="display-font mt-2 text-2xl font-semibold text-white">{title}</h2>
          <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{description}</p>
        </div>
        {action}
      </div>

      <div className="mt-8">
        {questions.map((question, index) => (
          <Link
            key={question.id}
            href={`/questions/${question.id}`}
            className="group block border-t border-white/[0.06] py-6 first:border-t-0 first:pt-0 last:pb-0"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="max-w-3xl space-y-3">
                <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span>{question.sourceType}</span>
                  <span>{question.visibility}</span>
                </div>
                <p className="display-font text-[1.85rem] leading-snug font-medium text-[#d2c4b3] transition-colors group-hover:text-[var(--accent)]">
                  {question.title}
                </p>
                <p className="max-w-2xl text-sm leading-7 text-[var(--muted)]">
                  {summarizeText(question.description || "설명이 비어 있는 물음이다.", 140)}
                </p>
              </div>
              <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-[var(--muted)] group-hover:text-[var(--accent)]" />
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] uppercase tracking-[0.16em] text-[var(--muted)]">
              <span>{question.author.nickname}</span>
              <span>{formatDate(question.createdAt)}</span>
            </div>
          </Link>
        ))}

        {questions.length === 0 ? (
          <p className="rounded-[1.75rem] border border-dashed border-white/10 px-4 py-6 text-sm text-[var(--muted)]">
            {emptyMessage}
          </p>
        ) : null}
      </div>
    </SectionCard>
  );
}
