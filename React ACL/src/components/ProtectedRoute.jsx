import { useLocalStorage } from '@/hooks';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { getItem } = useLocalStorage('user');
  const storedUser = getItem();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!storedUser?.id && location.pathname !== '/login') {
      navigate('/login');
      return;
    }

    if (
      storedUser?.id &&
      allowedRoles &&
      !allowedRoles.includes(storedUser.role)
    ) {
      if (storedUser.role === 'Admin') {
        navigate('/admin');
      } else if (storedUser.role === 'Editor') {
        navigate('/editor');
      } else {
        navigate('/');
      }
    }
  }, [storedUser, allowedRoles, location.pathname, navigate]);

  return storedUser ? children : null;
};

export default ProtectedRoute;
