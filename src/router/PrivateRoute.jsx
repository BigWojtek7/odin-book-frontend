import { Navigate, Outlet } from 'react-router-dom';

import useAuth from '../contexts/Auth/useAuth';

const PrivateRoute = () => {
  const auth = useAuth();
  if (!auth.token) return <Navigate to="/login" />;
  return <Outlet />;
};

export default PrivateRoute;