import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../services/actions';

export const ProtectedRoute = ({ element, anonymous = false }) => {
  const { user } = useSelector((store) => store.user);
  const [userRequested, setUserRequested] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  let from = '/';
  if (location.state) {
    from = location.state.from;
  }

  useEffect(() => {
    if (!userRequested) {
      dispatch(setUser());
      setUserRequested(true);
    }
    if (!user.name && !anonymous) {
      navigate('/login', { state: { from: location.pathname } });
    } else if (user.name && anonymous) {
      navigate(from);
    }
  }, [user, navigate, dispatch]);

  return element;
};
