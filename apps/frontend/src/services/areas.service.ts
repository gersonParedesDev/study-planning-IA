import { httpClient } from '../adapters/http-client';

export interface Area {
  id: string;
  name: string;
}

export const getAreas = async (): Promise<Area[]> => {
  const response = await httpClient.get<Area[]>('/areas/');
  return response.data;
};