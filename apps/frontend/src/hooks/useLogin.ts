import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { login } from '../services/auth.service';
import type { LoginData } from '../models/Login';
import { PATHS } from '../routes/paths';
import type { PlanType } from '../models/Register';

export const useLogin = () => {
  const { setToken, setUser } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (data: LoginData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await login(data);
      setToken(response.access_token);
      setUser({
        id: response.id,
        firstname: response.firstname,
        lastname: response.lastname,
        email: response.email,
        plan: response.plan as PlanType,
      });
      navigate(PATHS.HOMEPAGE);
    } catch {
      setError('Credenciales incorrectas.');
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, error, loading };
};