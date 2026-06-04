export const SOURCE_TYPES = [
  "direct",
  "book",
  "article",
  "lecture",
  "conversation",
  "other",
] as const;

export type SourceType = (typeof SOURCE_TYPES)[number];
export type Visibility = "public" | "private";

export type Profile = {
  id: string;
  nickname: string;
  createdAt: string;
  updatedAt: string;
};

export type Question = {
  id: string;
  authorId: string;
  title: string;
  description: string;
  sourceType: string;
  sourceTitle: string;
  sourceAuthor: string;
  visibility: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  author: Profile;
};

export type Thought = {
  id: string;
  questionId: string;
  authorId: string;
  parentThoughtId: string | null;
  content: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  author: Profile;
};

export type ThoughtBranch = Thought & {
  children: ThoughtBranch[];
};

export type QuestionDetail = {
  question: Question;
  thoughts: Thought[];
};

export type MePageData = {
  viewer: Profile | null;
  myQuestions: Question[];
  myThoughts: Thought[];
  recentThoughts: Thought[];
};
