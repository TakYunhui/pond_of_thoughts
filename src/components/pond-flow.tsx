"use client";

import { useState } from "react";
import { Controls, ReactFlow, type Edge, type Node } from "@xyflow/react";
import { MotionConfig, motion } from "framer-motion";
import { type Question, type Thought } from "@/lib/types";
import { cn, formatDate, summarizeText } from "@/lib/utils";

type PondFlowProps = {
  question: Question;
  thoughts: Thought[];
};

const LEVEL_X = 460;
const LEVEL_Y = 280;

function FlowQuestionNode({ question }: { question: Question }) {
  return (
    <div className="pond-node relative w-[19rem] rounded-[2.2rem] px-6 py-6 text-left shadow-[0_0_28px_rgba(194,204,216,0.06)]" data-active="true">
      <div className="pond-ripple absolute left-5 top-5 h-2.5 w-2.5 rounded-full bg-[var(--accent)] shadow-[0_0_18px_rgba(244,195,119,0.5)]" />
      <div className="pt-10">
        <p className="text-[10px] uppercase tracking-[0.26em] text-[var(--muted)]">물음</p>
        <p className="display-font mt-3 text-[1.7rem] leading-tight text-[#d2c4b3]">
          {question.title}
        </p>
        <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
          {summarizeText(question.description || "설명이 비어 있는 물음이다.", 88)}
        </p>
      </div>
    </div>
  );
}

function FlowThoughtNode({
  thought,
  selected,
}: {
  thought: Thought;
  selected: boolean;
}) {
  return (
    <div
      className={cn(
        "pond-node relative w-[17.5rem] rounded-[2rem] px-5 py-5 text-left",
        selected && "shadow-[0_0_32px_rgba(244,195,119,0.14)]",
      )}
      data-active={selected ? "true" : "false"}
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--muted)]">
          {thought.author.nickname}
        </p>
        <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--muted)]">
          {formatDate(thought.createdAt)}
        </p>
      </div>
      <p className="display-font text-[1.22rem] leading-snug text-[var(--foreground)]">
        {thought.isDeleted ? "삭제된 사유입니다." : summarizeText(thought.content, 76)}
      </p>
      <div className="mt-4 text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
        {thought.parentThoughtId ? "이어짐" : "첫 사유"}
      </div>
    </div>
  );
}

export function PondFlow({ question, thoughts }: PondFlowProps) {
  const [selectedThoughtId, setSelectedThoughtId] = useState<string | null>(
    thoughts[0]?.id ?? null,
  );

  const nodes: Node[] = [
    {
      id: `question:${question.id}`,
      position: { x: 80, y: Math.max(80, thoughts.length * 34) },
      data: {
        label: <FlowQuestionNode question={question} />,
      },
      draggable: false,
      selectable: false,
      style: {
        background: "transparent",
        border: "none",
        width: 304,
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

    for (const thought of items) {
      const descendants = groups.get(thought.id) ?? [];
      const branchHeight = Math.max(1, descendants.length + 1) * LEVEL_Y;
      const y = cursor;

      nodes.push({
        id: thought.id,
        position: { x: LEVEL_X * depth, y },
        data: {
          label: <FlowThoughtNode thought={thought} selected={selectedThoughtId === thought.id} />,
        },
        draggable: false,
        style: {
          background: "transparent",
          border: "none",
          width: 288,
        },
      });

      edges.push({
        id: `${parentId ?? question.id}-${thought.id}`,
        source: parentId ? parentId : `question:${question.id}`,
        target: thought.id,
        type: "smoothstep",
        style: {
          stroke: selectedThoughtId === thought.id ? "rgba(244,195,119,0.78)" : "rgba(217,228,239,0.16)",
          strokeWidth: selectedThoughtId === thought.id ? 1.8 : 1,
        },
      });

      cursor = placeThoughts(thought.id, depth + 1, y + LEVEL_Y) + branchHeight / 2;
    }

    return Math.max(startY + LEVEL_Y, cursor + LEVEL_Y);
  };

  placeThoughts(null, 1, 80);

  const selectedThought = thoughts.find((thought) => thought.id === selectedThoughtId) ?? null;
  const selectedChildren = selectedThought ? groups.get(selectedThought.id) ?? [] : [];

  return (
    <MotionConfig transition={{ duration: 0.42, ease: "easeOut" }}>
      <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="glass-card pond-ring relative h-[820px] overflow-hidden rounded-[2.4rem]">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(217,228,239,0.12),_transparent_62%)] blur-[90px]" />
            <div className="absolute left-[14%] top-[22%] h-80 w-80 rounded-full bg-[radial-gradient(circle,_rgba(194,204,216,0.08),_transparent_72%)]" />
            <div className="absolute right-[10%] bottom-[8%] h-96 w-96 rounded-full bg-[radial-gradient(circle,_rgba(244,195,119,0.07),_transparent_72%)]" />
            <div className="absolute left-[18%] top-[30%] h-44 w-44 rounded-full shadow-[0_0_0_1px_rgba(194,204,216,0.08)]" />
            <div className="absolute right-[18%] top-[48%] h-52 w-52 rounded-full shadow-[0_0_0_1px_rgba(244,195,119,0.06)]" />
          </div>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            fitView
            minZoom={0.35}
            maxZoom={1.35}
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable
            onNodeClick={(_, node) => {
              if (node.id.startsWith("question:")) {
                return;
              }

              setSelectedThoughtId(node.id);
            }}
          >
            <Controls
              position="bottom-left"
              className="!rounded-2xl !bg-[rgba(6,12,20,0.45)] !text-white [&_button]:!border-0 [&_button]:!bg-transparent [&_button:hover]:!bg-white/5"
            />
          </ReactFlow>
        </div>

        <motion.aside
          key={selectedThoughtId ?? "empty"}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-[2.3rem] p-6"
        >
          <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--muted)]">선택된 사유</p>
          {selectedThought ? (
            <div className="mt-4 space-y-4">
              <div>
                <p className="display-font text-2xl text-[#d2c4b3]">{selectedThought.author.nickname}</p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-[var(--muted)]">
                  {formatDate(selectedThought.updatedAt)}
                </p>
              </div>
              <p className="text-sm leading-7 text-[var(--foreground)]">
                {selectedThought.isDeleted ? "삭제된 사유입니다." : selectedThought.content}
              </p>
              <div className="grid gap-3">
                <div className="pond-note rounded-[1.8rem] p-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">이어짐 수</p>
                  <p className="mt-2 text-white">{selectedChildren.length}</p>
                </div>
                <div className="pond-note rounded-[1.8rem] p-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">상태</p>
                  <p className="mt-2 text-white">
                    {selectedThought.parentThoughtId ? "이어짐" : "첫 사유"}
                  </p>
                </div>
              </div>
              <p className="pond-note rounded-[1.8rem] px-4 py-3 text-sm leading-7 text-[var(--muted)]">
                실제 작성과 수정은 아래 結, 서로를 잇다에서 이어갈 수 있다.
              </p>
            </div>
          ) : (
            <p className="mt-4 rounded-[1.8rem] px-4 py-5 text-sm leading-7 text-[var(--muted)]">
              노드를 누르면 사유 상세가 여기 열린다.
            </p>
          )}
        </motion.aside>
      </section>
    </MotionConfig>
  );
}
