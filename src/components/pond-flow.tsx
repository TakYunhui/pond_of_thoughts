"use client";

import { useState } from "react";
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  type Edge,
  type Node,
} from "@xyflow/react";
import { MotionConfig, motion } from "framer-motion";
import { type Question, type Thought } from "@/lib/types";
import { formatDate, summarizeText } from "@/lib/utils";

type PondFlowProps = {
  question: Question;
  thoughts: Thought[];
};

const LEVEL_X = 320;
const LEVEL_Y = 180;

export function PondFlow({ question, thoughts }: PondFlowProps) {
  const [selectedThoughtId, setSelectedThoughtId] = useState<string | null>(
    thoughts[0]?.id ?? null,
  );

  const nodes: Node[] = [
    {
      id: `question:${question.id}`,
      position: { x: 80, y: Math.max(40, thoughts.length * 26) },
      data: {
        label: (
          <div className="max-w-[280px] space-y-2 rounded-[28px] border border-[rgba(255,203,121,0.2)] bg-[rgba(8,18,30,0.88)] px-5 py-4 text-left shadow-[0_0_40px_rgba(255,203,121,0.12)]">
            <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]">Question</p>
            <p className="display-font text-lg font-semibold text-white">{question.title}</p>
            <p className="text-xs leading-6 text-[var(--muted)]">
              {summarizeText(question.description || "설명이 비어 있는 질문이다.", 80)}
            </p>
          </div>
        ),
      },
      draggable: false,
      selectable: false,
      style: {
        background: "transparent",
        border: "none",
        width: 290,
      },
    },
  ];

  const edges: Edge[] = [];
  const groups = new Map<string | null, Thought[]>();

  for (const thought of thoughts) {
    const key = thought.parentThoughtId;
    const bucket = groups.get(key) ?? [];
    bucket.push(thought);
    groups.set(key, bucket);
  }

  const placeThoughts = (
    parentId: string | null,
    depth: number,
    startY: number,
  ): number => {
    const items = groups.get(parentId) ?? [];
    let cursor = startY;

    for (const [index, thought] of items.entries()) {
      const childCount = (groups.get(thought.id) ?? []).length;
      const branchHeight = Math.max(1, childCount) * LEVEL_Y;
      const y = cursor + index * 12;

      nodes.push({
        id: thought.id,
        position: { x: LEVEL_X * depth, y },
        data: {
          label: (
            <div
              className={`max-w-[250px] rounded-[24px] border px-4 py-3 text-left ${
                selectedThoughtId === thought.id
                  ? "border-[rgba(255,203,121,0.5)] bg-[rgba(18,28,41,0.94)] shadow-[0_0_32px_rgba(255,203,121,0.16)]"
                  : "border-white/10 bg-[rgba(11,20,30,0.92)]"
              }`}
            >
              <div className="mb-2 flex items-center justify-between gap-3">
                <p className="text-xs text-white">{thought.author.nickname}</p>
                <p className="text-[11px] text-[var(--muted)]">{formatDate(thought.createdAt)}</p>
              </div>
              <p className="text-sm leading-6 text-[var(--foreground)]">
                {thought.isDeleted ? "삭제된 사유입니다." : summarizeText(thought.content, 88)}
              </p>
            </div>
          ),
        },
        draggable: false,
        style: {
          background: "transparent",
          border: "none",
          width: 260,
        },
      });

      edges.push({
        id: `${parentId ?? question.id}-${thought.id}`,
        source: parentId ? parentId : `question:${question.id}`,
        target: thought.id,
        type: "smoothstep",
        style: {
          stroke: selectedThoughtId === thought.id ? "#ffcb79" : "rgba(237,243,249,0.2)",
          strokeWidth: selectedThoughtId === thought.id ? 1.6 : 1,
        },
      });

      cursor = placeThoughts(thought.id, depth + 1, y) + branchHeight / 2;
    }

    return Math.max(startY + LEVEL_Y, cursor + LEVEL_Y);
  };

  placeThoughts(null, 1, 60);

  const selectedThought = thoughts.find((thought) => thought.id === selectedThoughtId) ?? null;
  const selectedChildren = selectedThought ? groups.get(selectedThought.id) ?? [] : [];

  return (
    <MotionConfig transition={{ duration: 0.42, ease: "easeOut" }}>
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="glass-card pond-ring h-[620px] overflow-hidden rounded-[2rem] border border-white/10">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            fitView
            minZoom={0.4}
            maxZoom={1.5}
            onNodeClick={(_, node) => {
              if (node.id.startsWith("question:")) {
                return;
              }

              setSelectedThoughtId(node.id);
            }}
          >
            <Background color="rgba(255,255,255,0.08)" gap={28} />
            <MiniMap
              pannable
              zoomable
              style={{
                background: "rgba(4, 9, 15, 0.92)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
              nodeColor={(node) =>
                node.id.startsWith("question:") ? "rgba(255,203,121,0.9)" : "rgba(237,243,249,0.55)"
              }
            />
            <Controls
              position="bottom-left"
              className="!rounded-2xl !border !border-white/10 !bg-[rgba(6,12,20,0.75)] !text-white"
            />
          </ReactFlow>
        </div>

        <motion.aside
          key={selectedThoughtId ?? "empty"}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-[2rem] p-6"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Selected Thought</p>
          {selectedThought ? (
            <div className="mt-4 space-y-4">
              <div>
                <p className="text-sm text-white">{selectedThought.author.nickname}</p>
                <p className="mt-1 text-xs text-[var(--muted)]">
                  {formatDate(selectedThought.updatedAt)}
                </p>
              </div>
              <p className="text-sm leading-7 text-[var(--foreground)]">
                {selectedThought.isDeleted ? "삭제된 사유입니다." : selectedThought.content}
              </p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">파생 수</p>
                  <p className="mt-2 text-white">{selectedChildren.length}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">상태</p>
                  <p className="mt-2 text-white">
                    {selectedThought.parentThoughtId ? "파생 사유" : "1차 사유"}
                  </p>
                </div>
              </div>
              <p className="rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-sm leading-7 text-[var(--muted)]">
                실제 작성과 수정은 아래 읽기형 트리 영역에서 이어서 할 수 있다.
              </p>
            </div>
          ) : (
            <p className="mt-4 rounded-2xl border border-dashed border-white/10 px-4 py-5 text-sm leading-7 text-[var(--muted)]">
              노드를 누르면 사유 상세가 여기 열린다.
            </p>
          )}
        </motion.aside>
      </section>
    </MotionConfig>
  );
}
