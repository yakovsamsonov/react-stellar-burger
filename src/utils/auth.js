import { useContext, useState, createContext } from 'react';
import { getUserRequest, loginRequest, logoutRequest } from './burger-api';
import { setCookie, deleteCookie } from './cookie';

const AuthContext = createContext(undefined);

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export function useProvideAuth() {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    return await getUserRequest()
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUser({ ...data.user, id: data.user._id });
        }
        return data.success;
      });
  };

  const signIn = async (form) => {
    const data = await loginRequest(form)
      .then((res) => {
        let authToken;
        res.headers.forEach((header) => {
          if (header.indexOf('Bearer') === 0) {
            authToken = header.split('Bearer ')[1];
          }
        });
        if (authToken) {
          setCookie('token', authToken);
        }
        return res.json();
      })
      .then((data) => data);

    if (data.success) {
      setUser({ ...data.user, id: data.user._id });
    }
  };

  const signOut = async () => {
    await logoutRequest();
    setUser(null);
    deleteCookie('token');
  };

  return {
    user,
    getUser,
    signIn,
    signOut,
  };
}
