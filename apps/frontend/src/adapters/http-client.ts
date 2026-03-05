import axios from 'axios';
import { ENVS } from '../config/envs';

export const httpClient = axios.create({
  baseURL: ENVS.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor: Inyecta el token en cada petición si existe
httpClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor global para manejar errores de autenticación (Opcional pero recomendado)
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Si el backend dice 401 (Token expirado/inválido), borramos el token
      // y la app redirigirá al login automáticamente gracias al AuthContext
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);