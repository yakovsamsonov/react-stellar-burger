import { useAuth } from '../utils/auth';
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const ProtectedRouteElement = ({ element }) => {
  /*let { getUser, ...auth } = useAuth();
  const [isUserLoaded, setUserLoaded] = useState(false);

  const init = async () => {
    await getUser();
    setUserLoaded(true);
  };

  useEffect(() => {
    init();
  }, []);

  if (!isUserLoaded) {
    return null;
  }*/

  return element; //auth.user ? element : <Navigate to="/login" replace/>;
};
