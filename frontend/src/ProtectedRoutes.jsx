// ProtectedRoutes.jsx
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ children }) => {
  const { logged, token } = useSelector((state) => state.login);

  if (!logged || !token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoutes;
