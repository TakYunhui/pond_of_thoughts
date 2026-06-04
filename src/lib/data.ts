import { mockMePageData, mockQuestionDetails, mockQuestions, mockViewer } from "@/lib/mock-data";
import { type Database } from "@/lib/database.types";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { type MePageData, type Profile, type Question, type QuestionDetail, type Thought } from "@/lib/types";

type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];
type QuestionRow = Database["public"]["Tables"]["questions"]["Row"];
type ThoughtRow = Database["public"]["Tables"]["thoughts"]["Row"];

function mapProfile(row: ProfileRow): Profile {
  return {
    id: row.id,
    nickname: row.nickname,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapQuestion(row: QuestionRow, author: Profile): Question {
  return {
    id: row.id,
    authorId: row.author_id,
    title: row.title,
    description: row.description ?? "",
    sourceType: row.source_type,
    sourceTitle: row.source_title ?? "",
    sourceAuthor: row.source_author ?? "",
    visibility: row.visibility,
    isDeleted: row.is_deleted,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    author,
  };
}

function mapThought(row: ThoughtRow, author: Profile): Thought {
  return {
    id: row.id,
    questionId: row.question_id,
    authorId: row.author_id,
    parentThoughtId: row.parent_thought_id,
    content: row.content,
    isDeleted: row.is_deleted,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    author,
  };
}

async function loadProfiles(ids: string[]) {
  const supabase = await createSupabaseServerClient();
  const uniqueIds = [...new Set(ids)];

  if (uniqueIds.length === 0) {
    return new Map<string, Profile>();
  }

  const { data } = await supabase.from("profiles").select("*").in("id", uniqueIds);
  const profileMap = new Map<string, Profile>();

  for (const row of data ?? []) {
    profileMap.set(row.id, mapProfile(row));
  }

  return profileMap;
}

export async function isDemoMode() {
  return !hasSupabaseEnv();
}

export async function getCurrentViewer() {
  if (!hasSupabaseEnv()) {
    return mockViewer;
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (profile) {
    return mapProfile(profile);
  }

  return {
    id: user.id,
    nickname: user.user_metadata.nickname ?? user.email?.split("@")[0] ?? "익명",
    createdAt: user.created_at ?? new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export async function getQuestions(limit?: number) {
  if (!hasSupabaseEnv()) {
    return typeof limit === "number" ? mockQuestions.slice(0, limit) : mockQuestions;
  }

  const supabase = await createSupabaseServerClient();
  const query = supabase
    .from("questions")
    .select("*")
    .eq("is_deleted", false)
    .order("created_at", { ascending: false });

  const { data: rows, error } =
    typeof limit === "number" ? await query.limit(limit) : await query;

  if (error || !rows) {
    return [];
  }

  const profileMap = await loadProfiles(rows.map((row) => row.author_id));

  return rows.map((row) =>
    mapQuestion(
      row,
      profileMap.get(row.author_id) ?? {
        id: row.author_id,
        nickname: "익명",
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      },
    ),
  );
}

export async function getQuestionById(id: string): Promise<QuestionDetail | null> {
  if (!hasSupabaseEnv()) {
    return mockQuestionDetails[id] ?? null;
  }

  const supabase = await createSupabaseServerClient();
  const { data: questionRow, error } = await supabase
    .from("questions")
    .select("*")
    .eq("id", id)
    .eq("is_deleted", false)
    .maybeSingle();

  if (error || !questionRow) {
    return null;
  }

  const { data: thoughtRows } = await supabase
    .from("thoughts")
    .select("*")
    .eq("question_id", id)
    .order("created_at", { ascending: true });

  const profileMap = await loadProfiles([
    questionRow.author_id,
    ...(thoughtRows ?? []).map((row) => row.author_id),
  ]);

  const question = mapQuestion(
    questionRow,
    profileMap.get(questionRow.author_id) ?? {
      id: questionRow.author_id,
      nickname: "익명",
      createdAt: questionRow.created_at,
      updatedAt: questionRow.updated_at,
    },
  );

  const thoughts = (thoughtRows ?? []).map((row) =>
    mapThought(
      row,
      profileMap.get(row.author_id) ?? {
        id: row.author_id,
        nickname: "익명",
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      },
    ),
  );

  return { question, thoughts };
}

export async function getMePageData(): Promise<MePageData> {
  if (!hasSupabaseEnv()) {
    return mockMePageData;
  }

  const viewer = await getCurrentViewer();

  if (!viewer) {
    return {
      viewer: null,
      myQuestions: [],
      myThoughts: [],
      recentThoughts: [],
    };
  }

  const supabase = await createSupabaseServerClient();
  const { data: questionRows } = await supabase
    .from("questions")
    .select("*")
    .eq("author_id", viewer.id)
    .eq("is_deleted", false)
    .order("created_at", { ascending: false });

  const { data: thoughtRows } = await supabase
    .from("thoughts")
    .select("*")
    .eq("author_id", viewer.id)
    .order("updated_at", { ascending: false });

  const myQuestions = (questionRows ?? []).map((row) => mapQuestion(row, viewer));
  const myThoughts = (thoughtRows ?? []).map((row) => mapThought(row, viewer));

  return {
    viewer,
    myQuestions,
    myThoughts,
    recentThoughts: myThoughts.slice(0, 5),
  };
}
