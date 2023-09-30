import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../services/actions/user';

export const PrivateElement = ({ element }) => {
  const { user } = useSelector((store) => store.user);
  const [userRequested, setUserRequested] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userRequested) {
      dispatch(setUser());
      setUserRequested(true);
    }
    if (!user.name) {
      navigate('/login', { replace: true });
    }
  }, [user, navigate, dispatch]);

  return element;
};

export const OnlyPublicElement = ({ element }) => {
  const { user } = useSelector((store) => store.user);
  const [userRequested, setUserRequested] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userRequested) {
      dispatch(setUser());
      setUserRequested(true);
    }
    if (user.name) {
      navigate('/', { replace: true });
    }
  }, [user, navigate, dispatch]);

  return element;
};
