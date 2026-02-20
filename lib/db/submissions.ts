import { getSupabase } from "@/lib/supabase/server";

const TABLE = "submissions";

export type FormType = "apply" | "contact" | "hero" | "get_info";

export interface SubmissionRow {
  id: string;
  form_type: FormType;
  data: Record<string, unknown>;
  created_at: string;
}

export async function createSubmission(
  formType: FormType,
  data: Record<string, unknown>
): Promise<{ id: string } | null> {
  const supabase = getSupabase();
  const { data: row, error } = await supabase
    .from(TABLE)
    .insert({ form_type: formType, data: data ?? {} })
    .select("id")
    .single();
  if (error) {
    console.error("createSubmission error:", error);
    return null;
  }
  return row ? { id: (row as { id: string }).id } : null;
}

export async function getSubmissions(limit = 500): Promise<SubmissionRow[]> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from(TABLE)
    .select("id, form_type, data, created_at")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) {
    console.error("getSubmissions error:", error);
    return [];
  }
  return (data ?? []) as SubmissionRow[];
}

export async function getSubmissionById(id: string): Promise<SubmissionRow | null> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from(TABLE)
    .select("id, form_type, data, created_at")
    .eq("id", id)
    .single();
  if (error || !data) return null;
  return data as SubmissionRow;
}
