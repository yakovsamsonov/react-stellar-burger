import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const PrivateElement = ({ element }) => {
  const { user } = useSelector((store) => store.user);

  return user.name ? element : <Navigate to="/login" replace />;
};

export const OnlyPublicElement = ({ element }) => {
  const { user } = useSelector((store) => store.user);

  return user.name ? <Navigate to="/" replace /> : element;
};
