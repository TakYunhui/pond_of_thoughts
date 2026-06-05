import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { type Question } from "@/lib/types";
import { cn, formatDate, summarizeText } from "@/lib/utils";

type FloatingQuestionNodeProps = {
  question: Question;
  className?: string;
  delayMs?: number;
  active?: boolean;
  compact?: boolean;
};

export function FloatingQuestionNode({
  question,
  className,
  delayMs = 0,
  active = false,
  compact = false,
}: FloatingQuestionNodeProps) {
  if (compact) {
    return (
      <Link
        href={`/questions/${question.id}`}
        className={cn("pond-node group relative block rounded-[2.1rem] px-6 py-6 text-left", className)}
        data-active={active ? "true" : "false"}
      >
        <div className="pond-ripple absolute left-5 top-5 h-2.5 w-2.5 rounded-full bg-[var(--accent)] shadow-[0_0_18px_rgba(244,195,119,0.55)]" />
        <div className="pt-8">
          <p className="display-font text-[1.7rem] leading-[1.16] text-[#d2c4b3]">
            {question.title}
          </p>
          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
            {summarizeText(question.description || "설명이 비어 있는 질문이다.", 92)}
          </p>
          <div className="mt-5 flex items-center justify-between gap-3 text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
            <div className="flex flex-col gap-1">
              <span>{question.author.nickname}</span>
              <span>{formatDate(question.createdAt)}</span>
            </div>
            <ArrowUpRight className="h-4 w-4 text-[var(--accent)] opacity-80" />
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/questions/${question.id}`}
      className={cn(
        "pond-node group absolute z-10 block h-[7.25rem] w-[7.25rem] cursor-pointer overflow-hidden rounded-[42%_58%_53%_47%/52%_43%_57%_48%] px-5 py-5 text-left opacity-95 transition-[width,height,transform,box-shadow,opacity] duration-500 ease-out hover:z-30 hover:h-[15rem] hover:w-[20rem] hover:-translate-y-2 hover:opacity-100 focus-visible:z-30 focus-visible:h-[15rem] focus-visible:w-[20rem] focus-visible:-translate-y-2 focus-visible:opacity-100",
        className,
      )}
      data-active={active ? "true" : "false"}
      style={{ animationDelay: `${delayMs}ms` }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(217,228,239,0.08),transparent_60%)] opacity-70 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100" />
      <div className="absolute inset-[18%] rounded-full bg-[radial-gradient(circle,_rgba(217,228,239,0.12),_transparent_68%)] opacity-70 blur-xl transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100" />
      <div className="pond-ripple ripple-pulse absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)] shadow-[0_0_18px_rgba(244,195,119,0.55)] transition-all duration-500 group-hover:left-6 group-hover:top-6 group-hover:h-2.5 group-hover:w-2.5 group-hover:translate-x-0 group-hover:translate-y-0 group-focus-visible:left-6 group-focus-visible:top-6 group-focus-visible:h-2.5 group-focus-visible:w-2.5 group-focus-visible:translate-x-0 group-focus-visible:translate-y-0" />

      <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-0 group-focus-visible:opacity-0">
        <span className="text-[10px] uppercase tracking-[0.28em] text-[rgba(217,228,239,0.42)]">
          질문
        </span>
      </div>

      <div className="pointer-events-none relative flex h-full translate-y-4 flex-col justify-end pt-12 opacity-0 blur-sm transition-all duration-500 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-hover:blur-0 group-focus-visible:pointer-events-auto group-focus-visible:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:blur-0">
        <span className="text-[10px] uppercase tracking-[0.24em] text-[var(--muted)] opacity-70">
          질문
        </span>
        <p className="display-font max-w-[10ch] text-[2.05rem] leading-[1.12] text-[#d2c4b3]">
          {question.title}
        </p>
        <p className="mt-3 max-w-[28ch] text-sm leading-7 text-[var(--muted)]">
          {summarizeText(question.description || "설명이 비어 있는 질문이다.", 86)}
        </p>
        <div className="mt-5 flex items-center justify-between gap-3 text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
          <div className="flex flex-col gap-1">
            <span>{question.author.nickname}</span>
            <span>{formatDate(question.createdAt)}</span>
          </div>
          <ArrowUpRight className="h-4 w-4 text-[var(--accent)] opacity-80" />
        </div>
      </div>
    </Link>
  );
}
