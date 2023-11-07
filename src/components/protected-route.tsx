import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState, FC } from 'react';
import { useSelector } from 'react-redux';
import { setUser } from '../services/actions';
import { user as userSelector } from '../services/selectors/selectors';
import { useAppDispatch } from '../services/hooks';

type TProtectedRoute = {
  element: JSX.Element;
  anonymous?: boolean;
};

export const ProtectedRoute: FC<TProtectedRoute> = ({
  element,
  anonymous = false,
}) => {
  const { user } = useSelector(userSelector);
  const [userRequested, setUserRequested] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname, state } = useLocation();

  const from = state?.from || '/';

  useEffect(() => {
    if (!userRequested) {
      dispatch(setUser());
      setUserRequested(true);
    }
    if (!user.name && !anonymous) {
      navigate('/login', { state: { from: pathname } });
    } else if (user.name && anonymous) {
      navigate(from);
    }
  }, [user, navigate, dispatch, anonymous, from, pathname, userRequested]);

  return element;
};
