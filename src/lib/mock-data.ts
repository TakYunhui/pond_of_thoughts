import { type MePageData, type Profile, type Question, type QuestionDetail, type Thought } from "@/lib/types";

const now = new Date("2026-06-04T10:00:00.000Z");

function iso(offsetHours: number) {
  return new Date(now.getTime() + offsetHours * 60 * 60 * 1000).toISOString();
}

export const profiles: Profile[] = [
  {
    id: "user-demo",
    nickname: "유희",
    createdAt: iso(-120),
    updatedAt: iso(-2),
  },
  {
    id: "user-river",
    nickname: "연강",
    createdAt: iso(-200),
    updatedAt: iso(-12),
  },
  {
    id: "user-lamp",
    nickname: "미등",
    createdAt: iso(-170),
    updatedAt: iso(-8),
  },
];

export const mockViewer = profiles[0];

export const mockQuestions: Question[] = [
  {
    id: "q-life",
    authorId: profiles[0].id,
    title: "좋은 삶이란 무엇인가?",
    description: "좋음이 성취의 총합인지, 아니면 삶을 대하는 태도인지 오래 붙잡고 싶다.",
    sourceType: "direct",
    sourceTitle: "",
    sourceAuthor: "",
    visibility: "public",
    isDeleted: false,
    createdAt: iso(-72),
    updatedAt: iso(-20),
    author: profiles[0],
  },
  {
    id: "q-pain",
    authorId: profiles[1].id,
    title: "타인의 고통을 어디까지 이해할 수 있는가?",
    description: "이해가 가능하다고 말하는 순간 이미 오해가 시작되는 것은 아닌지.",
    sourceType: "article",
    sourceTitle: "타인의 고통에 대하여",
    sourceAuthor: "수전 손택",
    visibility: "public",
    isDeleted: false,
    createdAt: iso(-48),
    updatedAt: iso(-18),
    author: profiles[1],
  },
  {
    id: "q-work",
    authorId: profiles[2].id,
    title: "일을 통해 자아를 실현한다는 말은 타당한가?",
    description: "일과 생계, 소명과 노동을 분리해서 생각해야 하는지 기록해 본다.",
    sourceType: "lecture",
    sourceTitle: "노동과 자아",
    sourceAuthor: "익명 강연",
    visibility: "public",
    isDeleted: false,
    createdAt: iso(-32),
    updatedAt: iso(-6),
    author: profiles[2],
  },
];

export const thoughtsByQuestion: Record<string, Thought[]> = {
  "q-life": [
    {
      id: "t-life-1",
      questionId: "q-life",
      authorId: profiles[0].id,
      parentThoughtId: null,
      content: "좋은 삶은 완성된 상태보다, 매일의 선택이 스스로에게 납득되는 상태에 더 가깝다고 느낀다.",
      isDeleted: false,
      createdAt: iso(-70),
      updatedAt: iso(-10),
      author: profiles[0],
    },
    {
      id: "t-life-2",
      questionId: "q-life",
      authorId: profiles[1].id,
      parentThoughtId: "t-life-1",
      content: "납득은 중요하지만, 납득할 수 없는 시간을 견디는 방식도 삶의 일부가 아닐까.",
      isDeleted: false,
      createdAt: iso(-68),
      updatedAt: iso(-14),
      author: profiles[1],
    },
    {
      id: "t-life-3",
      questionId: "q-life",
      authorId: profiles[2].id,
      parentThoughtId: "t-life-2",
      content: "견딤이 미덕이 되는 순간을 경계해야 한다. 좋은 삶은 견디지 않아도 되는 구조를 상상하는 것일 수도 있다.",
      isDeleted: false,
      createdAt: iso(-66),
      updatedAt: iso(-15),
      author: profiles[2],
    },
    {
      id: "t-life-4",
      questionId: "q-life",
      authorId: profiles[0].id,
      parentThoughtId: null,
      content: "좋은 삶을 정의하려는 시도 자체가 삶을 지나치게 고정해 버리는 건 아닐까.",
      isDeleted: false,
      createdAt: iso(-61),
      updatedAt: iso(-6),
      author: profiles[0],
    },
  ],
  "q-pain": [
    {
      id: "t-pain-1",
      questionId: "q-pain",
      authorId: profiles[1].id,
      parentThoughtId: null,
      content: "타인의 고통을 이해한다기보다, 이해할 수 없다는 한계를 잊지 않는 태도가 먼저 필요하다.",
      isDeleted: false,
      createdAt: iso(-45),
      updatedAt: iso(-18),
      author: profiles[1],
    },
    {
      id: "t-pain-2",
      questionId: "q-pain",
      authorId: profiles[0].id,
      parentThoughtId: "t-pain-1",
      content: "그 한계를 인식하는 순간에도 결국 내 언어로 번역하고 있다는 점이 남는다.",
      isDeleted: false,
      createdAt: iso(-42),
      updatedAt: iso(-12),
      author: profiles[0],
    },
  ],
  "q-work": [
    {
      id: "t-work-1",
      questionId: "q-work",
      authorId: profiles[2].id,
      parentThoughtId: null,
      content: "자아실현이라는 말은 일을 견디게 만드는 좋은 포장지로도 쓰인다.",
      isDeleted: false,
      createdAt: iso(-28),
      updatedAt: iso(-6),
      author: profiles[2],
    },
    {
      id: "t-work-2",
      questionId: "q-work",
      authorId: profiles[0].id,
      parentThoughtId: "t-work-1",
      content: "그래도 어떤 일은 분명 사람을 넓힌다. 문제는 그 가능성이 의무처럼 강요될 때다.",
      isDeleted: false,
      createdAt: iso(-24),
      updatedAt: iso(-5),
      author: profiles[0],
    },
    {
      id: "t-work-3",
      questionId: "q-work",
      authorId: profiles[1].id,
      parentThoughtId: "t-work-2",
      content: "일이 나를 넓히는 순간과 소모하는 순간을 분리해 기록할 필요가 있다.",
      isDeleted: false,
      createdAt: iso(-22),
      updatedAt: iso(-3),
      author: profiles[1],
    },
  ],
};

export const mockQuestionDetails: Record<string, QuestionDetail> = Object.fromEntries(
  mockQuestions.map((question) => [
    question.id,
    {
      question,
      thoughts: thoughtsByQuestion[question.id] ?? [],
    },
  ]),
);

export const mockMePageData: MePageData = {
  viewer: mockViewer,
  myQuestions: mockQuestions.filter((question) => question.authorId === mockViewer.id),
  myThoughts: Object.values(thoughtsByQuestion)
    .flat()
    .filter((thought) => thought.authorId === mockViewer.id),
  recentThoughts: Object.values(thoughtsByQuestion)
    .flat()
    .filter((thought) => thought.authorId === mockViewer.id)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, 5),
};
