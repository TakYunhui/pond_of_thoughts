"use client";

import { useState } from "react";
import {
  Background,
  Controls,
  ReactFlow,
  type Edge,
  type Node,
} from "@xyflow/react";
import { MotionConfig, motion } from "framer-motion";
import { type Question, type Thought } from "@/lib/types";
import { cn, formatDate, summarizeText } from "@/lib/utils";

type PondFlowProps = {
  question: Question;
  thoughts: Thought[];
};

const LEVEL_X = 320;
const LEVEL_Y = 180;

function FlowQuestionNode({ question }: { question: Question }) {
  return (
    <div className="pond-node w-[18.75rem] rounded-[2rem] px-5 py-5 text-left shadow-[0_0_28px_rgba(194,204,216,0.08)]" data-active="true">
      <div className="pond-ripple absolute left-5 top-5 h-2.5 w-2.5 rounded-full bg-[var(--accent)] shadow-[0_0_18px_rgba(244,195,119,0.5)]" />
      <div className="pt-10">
        <p className="text-[10px] uppercase tracking-[0.26em] text-[var(--muted)]">Question</p>
        <p className="display-font mt-3 text-[1.65rem] leading-tight text-[#d2c4b3]">{question.title}</p>
        <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
          {summarizeText(question.description || "설명이 비어 있는 질문이다.", 88)}
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
        "pond-node w-[16.5rem] rounded-[1.7rem] px-4 py-4 text-left",
        selected && "shadow-[0_0_36px_rgba(244,195,119,0.14)]",
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
      <p className="display-font text-[1.18rem] leading-snug text-[var(--foreground)]">
        {thought.isDeleted ? "삭제된 사유입니다." : summarizeText(thought.content, 76)}
      </p>
      <div className="mt-4 border-t border-white/[0.06] pt-3 text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
        {thought.parentThoughtId ? "파생 사유" : "1차 사유"}
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
      position: { x: 80, y: Math.max(40, thoughts.length * 26) },
      data: {
        label: <FlowQuestionNode question={question} />,
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
          label: <FlowThoughtNode thought={thought} selected={selectedThoughtId === thought.id} />,
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
        <div className="glass-card pond-ring relative h-[620px] overflow-hidden rounded-[2.2rem] border border-white/10">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-1/2 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(217,228,239,0.12),_transparent_62%)] blur-[80px]" />
            <div className="absolute left-[12%] top-[18%] h-72 w-72 rounded-full border border-[rgba(194,204,216,0.08)]" />
            <div className="absolute right-[10%] bottom-[14%] h-80 w-80 rounded-full border border-[rgba(244,195,119,0.08)]" />
          </div>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            fitView
            minZoom={0.4}
            maxZoom={1.5}
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
            <Background color="rgba(217,228,239,0.06)" gap={34} />
            <Controls
              position="bottom-left"
              className="!rounded-2xl !border !border-white/10 !bg-[rgba(6,12,20,0.75)] !text-white [&_button]:!border-white/10 [&_button]:!bg-transparent [&_button:hover]:!bg-white/5"
            />
          </ReactFlow>
        </div>

        <motion.aside
          key={selectedThoughtId ?? "empty"}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-[2.2rem] p-6"
        >
          <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--muted)]">Selected Thought</p>
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
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <div className="pond-note rounded-[1.6rem] p-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">파생 수</p>
                  <p className="mt-2 text-white">{selectedChildren.length}</p>
                </div>
                <div className="pond-note rounded-[1.6rem] p-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">상태</p>
                  <p className="mt-2 text-white">
                    {selectedThought.parentThoughtId ? "파생 사유" : "1차 사유"}
                  </p>
                </div>
              </div>
              <p className="pond-note rounded-[1.6rem] px-4 py-3 text-sm leading-7 text-[var(--muted)]">
                실제 작성과 수정은 아래 읽기형 트리 영역에서 이어서 할 수 있다.
              </p>
            </div>
          ) : (
            <p className="mt-4 rounded-[1.6rem] border border-dashed border-white/10 px-4 py-5 text-sm leading-7 text-[var(--muted)]">
              노드를 누르면 사유 상세가 여기 열린다.
            </p>
          )}
        </motion.aside>
      </section>
    </MotionConfig>
  );
}
