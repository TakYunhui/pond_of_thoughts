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
  textSide?: "left" | "right";
};

export function FloatingQuestionNode({
  question,
  className,
  delayMs = 0,
  active = false,
  compact = false,
  textSide = "right",
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
        "pond-question-anchor group absolute z-10 block h-8 w-8 cursor-pointer",
        className,
      )}
      data-active={active ? "true" : "false"}
      style={{ animationDelay: `${delayMs}ms` }}
    >
      <div className="pond-point absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)] shadow-[0_0_16px_rgba(244,195,119,0.48)] transition-transform duration-300 group-hover:scale-125 group-focus-visible:scale-125" />
      <div className="pond-ripple-burst absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full" />
      <div className="pond-ripple-burst pond-ripple-burst-delay-1 absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full" />
      <div className="pond-ripple-burst pond-ripple-burst-delay-2 absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full" />

      <div
        className={cn(
          "pond-type-art pointer-events-none absolute top-1/2 w-[20rem] -translate-y-1/2",
          textSide === "left" ? "right-8 text-right" : "left-8 text-left",
        )}
      >
        <span className="text-[10px] uppercase tracking-[0.26em] text-[rgba(217,228,239,0.44)]">
          질문
        </span>
        <p className="display-font mt-2 text-[2.35rem] leading-[0.98] tracking-[-0.05em] text-[#d8cab7] [text-wrap:balance]">
          {question.title}
        </p>
        <p className="mt-3 max-w-[18rem] text-[13px] leading-6 text-[rgba(217,228,239,0.72)]">
          {summarizeText(question.description || "설명이 비어 있는 질문이다.", 54)}
        </p>
        <div
          className={cn(
            "mt-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-[rgba(217,228,239,0.42)]",
            textSide === "left" ? "justify-end" : "justify-start",
          )}
        >
          <span>{question.author.nickname}</span>
          <span>·</span>
          <span>{formatDate(question.createdAt)}</span>
          <ArrowUpRight className="h-3.5 w-3.5 text-[var(--accent)] opacity-80" />
        </div>
      </div>
    </Link>
  );
}
