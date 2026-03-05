import { httpClient } from '../adapters/http-client';

export interface UploadedResource {
  original_filename: string;
  saved_filename: string;
  file_url: string;
}

export const uploadFile = async (file: File): Promise<UploadedResource> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await httpClient.post<UploadedResource>('/resources/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};