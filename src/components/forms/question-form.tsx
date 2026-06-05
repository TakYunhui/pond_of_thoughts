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
            <span className="pond-field">물음 제목</span>
            <input
              name="title"
              required
              defaultValue={initialQuestion?.title}
              className="pond-input text-base"
              placeholder="좋은 삶이란 무엇일까?"
            />
          </label>

          <label className="block space-y-2">
            <span className="pond-field">물음 설명</span>
            <textarea
              name="description"
              rows={5}
              defaultValue={initialQuestion?.description ?? ""}
              className="pond-textarea text-sm leading-7"
              placeholder="왜 이 물음에 오래 머물게 되었는지 짧게 적어도 된다."
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block space-y-2">
              <span className="pond-field">출처 유형</span>
              <select
                name="sourceType"
                defaultValue={initialQuestion?.sourceType ?? "direct"}
                className="pond-select text-sm"
              >
                {SOURCE_TYPES.map((sourceType) => (
                  <option key={sourceType} value={sourceType}>
                    {sourceType}
                  </option>
                ))}
              </select>
            </label>

            <label className="block space-y-2">
              <span className="pond-field">공개 범위</span>
              <select
                name="visibility"
                defaultValue={initialQuestion?.visibility ?? "public"}
                className="pond-select text-sm"
              >
                {VISIBILITY_OPTIONS.map((visibility) => (
                  <option key={visibility} value={visibility}>
                    {visibility}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block space-y-2">
              <span className="pond-field">출처 제목</span>
              <input
                name="sourceTitle"
                defaultValue={initialQuestion?.sourceTitle ?? ""}
                className="pond-input text-sm"
                placeholder="책 제목 / 글 제목 / 강연 제목"
              />
            </label>

            <label className="block space-y-2">
              <span className="pond-field">출처 저자 또는 작성자</span>
              <input
                name="sourceAuthor"
                defaultValue={initialQuestion?.sourceAuthor ?? ""}
                className="pond-input text-sm"
                placeholder="저자명 또는 작성자"
              />
            </label>
          </div>
        </fieldset>

        {disabledReason ? (
          <p className="pond-note rounded-[1.5rem] px-4 py-3 text-sm text-[var(--muted)]">
            {disabledReason}
          </p>
        ) : null}

        <SubmitButton
          className="pond-button rounded-full px-5 py-3 text-[11px] font-medium"
          pendingLabel="적는 중..."
          disabled={disabled}
        >
          {submitLabel}
        </SubmitButton>
      </form>
    </SectionCard>
  );
}
