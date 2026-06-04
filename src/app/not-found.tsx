import Link from "next/link";
import { SectionCard } from "@/components/section-card";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-5 py-10 sm:px-8">
      <SectionCard className="rounded-[2rem] p-8">
        <h1 className="display-font text-3xl font-semibold text-white">찾을 수 없는 수면</h1>
        <p className="mt-3 text-base leading-8 text-[var(--muted)]">
          요청한 질문이나 페이지가 존재하지 않거나 이미 숨겨졌다.
        </p>
        <Link
          href="/questions"
          className="mt-6 inline-flex w-fit rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[#1b1408]"
        >
          질문 목록으로
        </Link>
      </SectionCard>
    </main>
  );
}
