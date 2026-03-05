import { httpClient } from '../adapters/http-client';
import type { AuthResponse } from '../models/User';
import type { LoginData } from '../models/Login';
import type { RegisterData } from '../models/Register';

export const login = async (data: LoginData): Promise<AuthResponse> => {
  const formData = new URLSearchParams();
  formData.append('username', data.email);
  formData.append('password', data.password);

  const response = await httpClient.post<AuthResponse>('/auth/login', formData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  return response.data;
};

export const registerUser = async (data: RegisterData) => {

  const payload = {
    firstname: data.firstName,
    lastname: data.lastName,
    email: data.email,
    password: data.password,
    plan: data.plan.toUpperCase(),
  };

  const response = await httpClient.post('/api/v1/users/register', payload);
  return response.data;
};