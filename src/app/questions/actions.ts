"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/supabase/env";

function value(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function nullable(valueToCheck: string) {
  return valueToCheck.length > 0 ? valueToCheck : null;
}

async function requireWriter() {
  if (!hasSupabaseEnv()) {
    redirect("/questions");
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?message=로그인 후에 이어 써라.");
  }

  return { supabase, user };
}

export async function createQuestionAction(formData: FormData) {
  const { supabase, user } = await requireWriter();

  const payload = {
    author_id: user.id,
    title: value(formData, "title"),
    description: nullable(value(formData, "description")),
    source_type: value(formData, "sourceType") || "direct",
    source_title: nullable(value(formData, "sourceTitle")),
    source_author: nullable(value(formData, "sourceAuthor")),
    visibility: value(formData, "visibility") || "public",
  };

  const { data, error } = await supabase
    .from("questions")
    .insert(payload)
    .select("id")
    .single();

  if (error || !data) {
    redirect("/questions/new?message=질문 저장에 실패했다.");
  }

  revalidatePath("/questions");
  redirect(`/questions/${data.id}`);
}

export async function updateQuestionAction(formData: FormData) {
  const { supabase, user } = await requireWriter();
  const questionId = value(formData, "questionId");

  const { error } = await supabase
    .from("questions")
    .update({
      title: value(formData, "title"),
      description: nullable(value(formData, "description")),
      source_type: value(formData, "sourceType") || "direct",
      source_title: nullable(value(formData, "sourceTitle")),
      source_author: nullable(value(formData, "sourceAuthor")),
      visibility: value(formData, "visibility") || "public",
      updated_at: new Date().toISOString(),
    })
    .eq("id", questionId)
    .eq("author_id", user.id);

  if (error) {
    redirect(`/questions/${questionId}/edit?message=질문 수정에 실패했다.`);
  }

  revalidatePath("/questions");
  revalidatePath(`/questions/${questionId}`);
  redirect(`/questions/${questionId}`);
}

export async function softDeleteQuestionAction(formData: FormData) {
  const { supabase, user } = await requireWriter();
  const questionId = value(formData, "questionId");

  await supabase
    .from("questions")
    .update({
      is_deleted: true,
      updated_at: new Date().toISOString(),
    })
    .eq("id", questionId)
    .eq("author_id", user.id);

  revalidatePath("/questions");
  redirect("/questions");
}

export async function createThoughtAction(formData: FormData) {
  const { supabase, user } = await requireWriter();
  const questionId = value(formData, "questionId");

  const { error } = await supabase.from("thoughts").insert({
    question_id: questionId,
    author_id: user.id,
    parent_thought_id: nullable(value(formData, "parentThoughtId")),
    content: value(formData, "content"),
  });

  if (error) {
    redirect(`/questions/${questionId}?message=사유 저장에 실패했다.`);
  }

  revalidatePath(`/questions/${questionId}`);
  redirect(`/questions/${questionId}`);
}

export async function updateThoughtAction(formData: FormData) {
  const { supabase, user } = await requireWriter();
  const questionId = value(formData, "questionId");
  const thoughtId = value(formData, "thoughtId");

  const { error } = await supabase
    .from("thoughts")
    .update({
      content: value(formData, "content"),
      updated_at: new Date().toISOString(),
    })
    .eq("id", thoughtId)
    .eq("author_id", user.id);

  if (error) {
    redirect(`/questions/${questionId}?message=사유 수정에 실패했다.`);
  }

  revalidatePath(`/questions/${questionId}`);
  redirect(`/questions/${questionId}`);
}

export async function softDeleteThoughtAction(formData: FormData) {
  const { supabase, user } = await requireWriter();
  const questionId = value(formData, "questionId");
  const thoughtId = value(formData, "thoughtId");

  await supabase
    .from("thoughts")
    .update({
      is_deleted: true,
      updated_at: new Date().toISOString(),
    })
    .eq("id", thoughtId)
    .eq("author_id", user.id);

  revalidatePath(`/questions/${questionId}`);
  redirect(`/questions/${questionId}`);
}
