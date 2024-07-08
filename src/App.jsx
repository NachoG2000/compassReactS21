import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './pages/Layout';
import UnprotectedHeaderLayout from './pages/UnprotectedHeaderLayout';
import AdminPage from './pages/AdminPage';
import LandingPage from './pages/LandingPage';
import FormularioPage from './pages/FormularioPage';
import NotFoundPage from './pages/NotFoundPage';
import DashboardAdminPage from './pages/admin/DashboardAdminPage';
import OfertaAcademicaAdminPage from './pages/admin/OfertaAcademicaAdminPage';
import FormularioAdminPage from './pages/admin/FormularioAdminPage';
import UsuariosAdminPage from './pages/admin/UsuariosAdminPage';
import CarrerasDeOfertaAdminPage from './pages/admin/CarrerasDeOfertaAdminPage'
import LoginPage from './pages/LoginPage';
import RequireAuth from './auth/RequireAuth';

import './App.css';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Unprotected Routes */}
        <Route element={<UnprotectedHeaderLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="formulario" element={<FormularioPage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<RequireAuth />}>
          <Route path="administrador" element={<AdminPage />}>
            <Route index element={<DashboardAdminPage />} />
            <Route path="formulario" element={<FormularioAdminPage />} />
            <Route path="usuarios" element={<UsuariosAdminPage />} />
            <Route path="ofertaacademica" element={<OfertaAcademicaAdminPage />} />
            <Route path="ofertaacademica/:id" element={<CarrerasDeOfertaAdminPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Route>

        {/* Not Found Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}


export default App;
