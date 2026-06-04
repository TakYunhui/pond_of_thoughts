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
          <h3 className={`display-font font-semibold text-white ${compact ? "text-xl" : "text-2xl"}`}>
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
            className="w-full rounded-2xl border border-white/10 bg-black/15 px-4 py-3 text-sm leading-7 text-white outline-none placeholder:text-white/25 focus:border-[var(--accent)]"
            placeholder="생각의 조각을 그대로 남겨도 된다."
          />
        </fieldset>

        {disabledReason ? (
          <p className="rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-sm text-[var(--muted)]">
            {disabledReason}
          </p>
        ) : null}

        <SubmitButton
          className="rounded-full bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-[#1b1408]"
          pendingLabel="저장 중..."
          disabled={disabled}
        >
          {submitLabel}
        </SubmitButton>
      </form>
    </SectionCard>
  );
}
