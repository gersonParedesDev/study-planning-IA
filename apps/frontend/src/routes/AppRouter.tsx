import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PATHS } from './paths';

import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

import {LoginPage} from '../pages/LoginPage';
import {RegisterPage} from '../pages/RegisterPage';
import HomePage from '../pages/HomePage';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas - solo sin login */}
        <Route element={<PublicRoute />}>
          <Route path={PATHS.LOGIN} element={<LoginPage />} />
          <Route path={PATHS.REGISTER} element={<RegisterPage />} />

        </Route>

        <Route element={<PrivateRoute />}>
            <Route path={PATHS.HOMEPAGE} element={<HomePage />} />
        </Route>

        <Route path="*" element={<Navigate to={PATHS.LOGIN} replace />} />
      </Routes>
    </BrowserRouter>
  );
};