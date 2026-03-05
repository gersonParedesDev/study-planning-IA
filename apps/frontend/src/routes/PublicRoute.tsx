import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PATHS } from './paths';

export const PublicRoute = () => {
  const { isAuthenticated } = useAuth();

  // Si ya está logueado y quiere ver el login, lo mandamos al dashboard
  return isAuthenticated ? <Navigate to={PATHS.HOMEPAGE} replace /> : <Outlet />;
};