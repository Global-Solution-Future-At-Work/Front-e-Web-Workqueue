import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateRoute = () => {
  const isAuthenticated = localStorage.getItem('token');
  const location = useLocation(); // Pega a rota atual que ele tentou acessar

  if (!isAuthenticated) {
    // Redireciona para login, mas envia o estado "from" (de onde ele veio)
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;