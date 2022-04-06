import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute({ isLoggedIn }) {
  return isLoggedIn ? <Outlet /> : <Navigate to="/intro" />;
}

export default PrivateRoute;
