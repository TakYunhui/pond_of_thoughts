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
  absolute?: boolean;
};

export function FloatingQuestionNode({
  question,
  className,
  delayMs = 0,
  active = false,
  compact = false,
  absolute = true,
}: FloatingQuestionNodeProps) {
  return (
    <Link
      href={`/questions/${question.id}`}
      className={cn(
        "pond-node group rounded-[2rem] px-5 py-5 text-left float-drift",
        absolute ? "absolute" : "relative",
        compact && "rounded-[1.75rem]",
        className,
      )}
      data-active={active ? "true" : "false"}
      style={{ animationDelay: `${delayMs}ms` }}
    >
      <div className="pond-ripple ripple-pulse absolute left-5 top-5 h-2.5 w-2.5 rounded-full bg-[var(--accent)] shadow-[0_0_18px_rgba(244,195,119,0.55)]" />
      <div className={cn("pt-10", compact && "pt-8")}>
        <p
          className={cn(
            "display-font text-[1.85rem] leading-[1.18] text-[#d2c4b3]",
            compact && "text-[1.55rem]",
          )}
        >
          {question.title}
        </p>
        <p className="mt-3 max-w-[28ch] text-sm leading-7 text-[var(--muted)]">
          {summarizeText(question.description || "설명이 비어 있는 질문이다.", compact ? 88 : 104)}
        </p>
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/[0.06] pt-4 text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
          <div className="flex flex-col gap-1">
            <span>{question.author.nickname}</span>
            <span>{formatDate(question.createdAt)}</span>
          </div>
          <ArrowUpRight className="h-4 w-4 text-[var(--accent)] opacity-70 transition-opacity group-hover:opacity-100" />
        </div>
      </div>
    </Link>
  );
}
