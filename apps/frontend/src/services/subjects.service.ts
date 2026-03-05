import { httpClient } from '../adapters/http-client';

export type ResourceType = 'syllabus' | 'book' | 'exam' | 'practice' | 'notes' | 'other';

export interface ResourceInput {
  title: string;
  file_url: string;
  filename: string;
  resource_type: ResourceType;
}

export interface CreateSubjectPayload {
  name: string;
  area_id: string;
  resources: ResourceInput[];
}

export interface Subject {
  id: string;
  user_id: string;
  area_id: string;
  name: string;
}

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