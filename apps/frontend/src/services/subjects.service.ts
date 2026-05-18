import { httpClient } from '../adapters/http-client';

// ── Enums ─────────────────────────────────────────────────────────────────────

export type ResourceType =
  | 'syllabus'
  | 'book'
  | 'exam'
  | 'practice'
  | 'notes'
  | 'other';

export type ResourceSourceType =
  | 'text'
  | 'pdf'
  | 'image'
  | 'title_only';  // para libros sin archivo

// ── Resource ──────────────────────────────────────────────────────────────────

export interface ResourceInput {
  title: string;
  resource_type: ResourceType;
  source_type: ResourceSourceType;
  file_url?: string | null;
  filename?: string | null;
  text_content?: string | null;
}

export interface ResourceOutput {
  id: string;
  title: string;
  resource_type: ResourceType;
  source_type: ResourceSourceType;
  file_url?: string | null;
  extracted_text?: string | null;
}

// ── Subject ───────────────────────────────────────────────────────────────────

export interface Subject {
  id: string;
  user_id: string;
  area_id: string;
  area_name?: string | null;      // viene del join con areas
  name: string;
  description?: string | null;
  exam_date?: string | null;      // fecha del parcial
  resources: ResourceOutput[];
  created_at: string;
}

export interface CreateSubjectPayload {
  name: string;
  area_id: string;
  exam_date?: string | null;
  program_text?: string | null;   // texto del programa pegado
  books?: string[];               // títulos de libros
  resources: ResourceInput[];
}

export interface UpdateSubjectPayload {
  name?: string;
  description?: string | null;
}

// ── API calls ─────────────────────────────────────────────────────────────────

export const createSubject = async (payload: CreateSubjectPayload): Promise<Subject> => {
  const response = await httpClient.post<Subject>('/subjects/', payload);
  return response.data;
};

export const getSubjectsByUser = async (): Promise<Subject[]> => {
  const response = await httpClient.get<Subject[]>('/subjects/');
  return response.data;
};

export const deleteSubject = async (subjectId: string): Promise<void> => {
  await httpClient.delete(`/subjects/${subjectId}`);
};

export const updateSubject = async (subjectId: string, payload: UpdateSubjectPayload): Promise<Subject> => {
  const response = await httpClient.patch<Subject>(`/subjects/${subjectId}`, payload);
  return response.data;
};