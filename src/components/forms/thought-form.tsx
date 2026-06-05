import { SectionCard } from "@/components/section-card";
import { SubmitButton } from "@/components/submit-button";

type ThoughtFormProps = {
  action: (formData: FormData) => void | Promise<void>;
  submitLabel: string;
  questionId: string;
  thoughtId?: string;
  parentThoughtId?: string | null;
  initialContent?: string;
  disabled?: boolean;
  disabledReason?: string;
  title?: string;
  description?: string;
  compact?: boolean;
};

export function ThoughtForm({
  action,
  submitLabel,
  questionId,
  thoughtId,
  parentThoughtId,
  initialContent,
  disabled = false,
  disabledReason,
  title = "사유 남기기",
  description,
  compact = false,
}: ThoughtFormProps) {
  return (
    <SectionCard className={`rounded-[2rem] ${compact ? "p-4" : "p-6"}`}>
      <form action={action} className="space-y-4">
        <input type="hidden" name="questionId" value={questionId} />
        {thoughtId ? <input type="hidden" name="thoughtId" value={thoughtId} /> : null}
        {parentThoughtId ? (
          <input type="hidden" name="parentThoughtId" value={parentThoughtId} />
        ) : null}

        <div>
          <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--muted)]">사유</p>
          <h3 className={`display-font mt-2 font-semibold text-white ${compact ? "text-xl" : "text-2xl"}`}>
            {title}
          </h3>
          {description ? (
            <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{description}</p>
          ) : null}
        </div>

        <fieldset disabled={disabled} className="space-y-4 disabled:opacity-60">
          <textarea
            name="content"
            rows={compact ? 4 : 6}
            required
            defaultValue={initialContent ?? ""}
            className="pond-textarea text-sm leading-7"
            placeholder="생각의 조각을 그대로 적어도 된다."
          />
        </fieldset>

        {disabledReason ? (
          <p className="pond-note rounded-[1.5rem] px-4 py-3 text-sm text-[var(--muted)]">
            {disabledReason}
          </p>
        ) : null}

        <SubmitButton
          className="pond-button rounded-full px-4 py-2.5 text-[11px] font-medium"
          pendingLabel="적는 중..."
          disabled={disabled}
        >
          {submitLabel}
        </SubmitButton>
      </form>
    </SectionCard>
  );
}
