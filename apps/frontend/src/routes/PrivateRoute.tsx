import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PATHS } from './paths';

export const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();

  // Si no está autenticado, lo patea al login. Si lo está, renderiza la ruta hija (Outlet)
  return isAuthenticated ? <Outlet /> : <Navigate to={PATHS.LOGIN} replace />;
};