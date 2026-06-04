import { SectionCard } from "@/components/section-card";
import { SOURCE_TYPES, type Question, type Visibility } from "@/lib/types";
import { SubmitButton } from "@/components/submit-button";

type QuestionFormProps = {
  action: (formData: FormData) => void | Promise<void>;
  submitLabel: string;
  initialQuestion?: Question;
  hiddenQuestionId?: string;
  disabled?: boolean;
  disabledReason?: string;
};

const VISIBILITY_OPTIONS: Visibility[] = ["public", "private"];

export function QuestionForm({
  action,
  submitLabel,
  initialQuestion,
  hiddenQuestionId,
  disabled = false,
  disabledReason,
}: QuestionFormProps) {
  return (
    <SectionCard className="rounded-[2rem] p-6">
      <form action={action} className="space-y-5">
        {hiddenQuestionId ? <input type="hidden" name="questionId" value={hiddenQuestionId} /> : null}
        <fieldset disabled={disabled} className="space-y-5 disabled:opacity-60">
          <label className="block space-y-2">
            <span className="text-sm text-[var(--muted)]">질문 제목</span>
            <input
              name="title"
              required
              defaultValue={initialQuestion?.title}
              className="w-full rounded-2xl border border-white/10 bg-black/15 px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-[var(--accent)]"
              placeholder="좋은 삶이란 무엇인가?"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm text-[var(--muted)]">질문 설명</span>
            <textarea
              name="description"
              rows={5}
              defaultValue={initialQuestion?.description ?? ""}
              className="w-full rounded-2xl border border-white/10 bg-black/15 px-4 py-3 text-sm leading-7 text-white outline-none placeholder:text-white/25 focus:border-[var(--accent)]"
              placeholder="왜 이 질문을 붙잡게 되었는지 짧게 남겨도 된다."
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block space-y-2">
              <span className="text-sm text-[var(--muted)]">출처 유형</span>
              <select
                name="sourceType"
                defaultValue={initialQuestion?.sourceType ?? "direct"}
                className="w-full rounded-2xl border border-white/10 bg-black/15 px-4 py-3 text-sm text-white outline-none focus:border-[var(--accent)]"
              >
                {SOURCE_TYPES.map((sourceType) => (
                  <option key={sourceType} value={sourceType} className="bg-slate-900">
                    {sourceType}
                  </option>
                ))}
              </select>
            </label>

            <label className="block space-y-2">
              <span className="text-sm text-[var(--muted)]">공개 범위</span>
              <select
                name="visibility"
                defaultValue={initialQuestion?.visibility ?? "public"}
                className="w-full rounded-2xl border border-white/10 bg-black/15 px-4 py-3 text-sm text-white outline-none focus:border-[var(--accent)]"
              >
                {VISIBILITY_OPTIONS.map((visibility) => (
                  <option key={visibility} value={visibility} className="bg-slate-900">
                    {visibility}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block space-y-2">
              <span className="text-sm text-[var(--muted)]">출처 제목</span>
              <input
                name="sourceTitle"
                defaultValue={initialQuestion?.sourceTitle ?? ""}
                className="w-full rounded-2xl border border-white/10 bg-black/15 px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-[var(--accent)]"
                placeholder="책 제목 / 글 제목 / 강연 제목"
              />
            </label>

            <label className="block space-y-2">
              <span className="text-sm text-[var(--muted)]">출처 저자 또는 작성자</span>
              <input
                name="sourceAuthor"
                defaultValue={initialQuestion?.sourceAuthor ?? ""}
                className="w-full rounded-2xl border border-white/10 bg-black/15 px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-[var(--accent)]"
                placeholder="저자명 또는 작성자"
              />
            </label>
          </div>
        </fieldset>

        {disabledReason ? (
          <p className="rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-sm text-[var(--muted)]">
            {disabledReason}
          </p>
        ) : null}

        <SubmitButton
          className="rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[#1b1408]"
          pendingLabel="저장 중..."
          disabled={disabled}
        >
          {submitLabel}
        </SubmitButton>
      </form>
    </SectionCard>
  );
}
