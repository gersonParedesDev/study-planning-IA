import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PATHS } from './paths';

import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import HomePage from '../pages/HomePage';
import SettingsPage from '../pages/SettingsPage';
import CalendarPage from '../pages/CalendarPage';

// estas páginas las creamos después
const SubjectDetailPage = () => <div>Subject Detail — coming soon</div>;
const SubjectsNewPage = () => <div>New Subject — coming soon</div>;
const ProgressPage = () => <div>Progreso — coming soon</div>;
const ProfilePage = () => <div>Perfil — coming soon</div>;

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path={PATHS.LOGIN} element={<LoginPage />} />
          <Route path={PATHS.REGISTER} element={<RegisterPage />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path={PATHS.HOMEPAGE}        element={<HomePage />} />
          <Route path={PATHS.SUBJECTS_NEW}    element={<SubjectsNewPage />} />
          <Route path={PATHS.SUBJECT_DETAIL}  element={<SubjectDetailPage />} />
          <Route path={PATHS.CALENDAR}        element={<CalendarPage />} />
          <Route path={PATHS.PROGRESS}        element={<ProgressPage />} />
          <Route path={PATHS.PROFILE}         element={<ProfilePage />} />
          <Route path={PATHS.SETTINGS}        element={<SettingsPage />} />
        </Route>

        <Route path="*" element={<Navigate to={PATHS.LOGIN} replace />} />
      </Routes>
    </BrowserRouter>
  );
};