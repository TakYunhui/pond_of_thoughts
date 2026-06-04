import { type Thought, type ThoughtBranch } from "@/lib/types";

export function buildThoughtForest(thoughts: Thought[]): ThoughtBranch[] {
  const byParent = new Map<string | null, Thought[]>();

  for (const thought of thoughts) {
    const bucket = byParent.get(thought.parentThoughtId) ?? [];
    bucket.push(thought);
    byParent.set(thought.parentThoughtId, bucket);
  }

  const buildBranch = (thought: Thought): ThoughtBranch => ({
    ...thought,
    children: (byParent.get(thought.id) ?? []).map(buildBranch),
  });

  return (byParent.get(null) ?? []).map(buildBranch);
}
