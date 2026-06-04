import {
  createThoughtAction,
  softDeleteThoughtAction,
  updateThoughtAction,
} from "@/app/questions/actions";
import { buildThoughtForest } from "@/lib/thought-tree";
import { type Thought, type ThoughtBranch } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { ThoughtForm } from "@/components/forms/thought-form";
import { SectionCard } from "@/components/section-card";

type ThoughtTreeProps = {
  questionId: string;
  thoughts: Thought[];
  currentUserId: string | null;
  demoMode: boolean;
};

function ThoughtBranchCard({
  branch,
  questionId,
  currentUserId,
  demoMode,
  depth = 0,
}: {
  branch: ThoughtBranch;
  questionId: string;
  currentUserId: string | null;
  demoMode: boolean;
  depth?: number;
}) {
  const canEdit = !!currentUserId && branch.author.id === currentUserId && !demoMode;
  const canReply = !!currentUserId && !demoMode;

  return (
    <li className="space-y-4">
      <article
        className="rounded-[1.5rem] border border-white/10 bg-black/10 p-4"
        style={{ marginLeft: `${depth * 18}px` }}
      >
        <div className="mb-2 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm text-white">{branch.author.nickname}</p>
            <p className="mt-1 text-xs text-[var(--muted)]">{formatDate(branch.updatedAt)}</p>
          </div>
          <span className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-[var(--muted)]">
            {branch.children.length} branches
          </span>
        </div>

        <p className="text-sm leading-7 text-[var(--foreground)]">
          {branch.isDeleted ? "삭제된 사유입니다." : branch.content}
        </p>

        <div className="mt-4 grid gap-3">
          <details className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <summary className="cursor-pointer text-sm text-white">이 사유에서 이어쓰기</summary>
            <div className="pt-4">
              <ThoughtForm
                action={createThoughtAction}
                submitLabel="이어쓰기 저장"
                questionId={questionId}
                parentThoughtId={branch.id}
                compact
                disabled={!canReply}
                disabledReason={
                  demoMode ? "데모 모드에서는 저장이 막혀 있다." : "로그인 후에 이어 쓸 수 있다."
                }
              />
            </div>
          </details>

          {canEdit ? (
            <details className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <summary className="cursor-pointer text-sm text-white">사유 수정 / 숨기기</summary>
              <div className="pt-4 space-y-4">
                <ThoughtForm
                  action={updateThoughtAction}
                  submitLabel="수정 저장"
                  questionId={questionId}
                  thoughtId={branch.id}
                  initialContent={branch.content}
                  compact
                />
                <form action={softDeleteThoughtAction}>
                  <input type="hidden" name="questionId" value={questionId} />
                  <input type="hidden" name="thoughtId" value={branch.id} />
                  <button
                    type="submit"
                    className="rounded-full border border-[color:rgba(255,152,152,0.25)] bg-[color:rgba(255,152,152,0.08)] px-4 py-2 text-sm text-[var(--danger)]"
                  >
                    사유 숨기기
                  </button>
                </form>
              </div>
            </details>
          ) : null}
        </div>
      </article>

      {branch.children.length > 0 ? (
        <ol className="space-y-4">
          {branch.children.map((child) => (
            <ThoughtBranchCard
              key={child.id}
              branch={child}
              questionId={questionId}
              currentUserId={currentUserId}
              demoMode={demoMode}
              depth={depth + 1}
            />
          ))}
        </ol>
      ) : null}
    </li>
  );
}

export function ThoughtTree({
  questionId,
  thoughts,
  currentUserId,
  demoMode,
}: ThoughtTreeProps) {
  const forest = buildThoughtForest(thoughts);

  return (
    <SectionCard className="rounded-[2rem] p-6">
      <div className="mb-5">
        <h2 className="display-font text-2xl font-semibold text-white">읽기형 트리</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          모바일에서 먼저 읽히는 구조다. 작성, 수정, 파생 작성도 여기서 처리한다.
        </p>
      </div>

      {forest.length > 0 ? (
        <ol className="space-y-4">
          {forest.map((branch) => (
            <ThoughtBranchCard
              key={branch.id}
              branch={branch}
              questionId={questionId}
              currentUserId={currentUserId}
              demoMode={demoMode}
            />
          ))}
        </ol>
      ) : (
        <p className="rounded-[1.5rem] border border-dashed border-white/10 px-4 py-6 text-sm text-[var(--muted)]">
          아직 남은 사유가 없다. 첫 사유를 남겨서 흐름을 시작해라.
        </p>
      )}
    </SectionCard>
  );
}
