import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  Constructor,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  UserInfo,
} from '../../pages';
import { PrivateElement, OnlyPublicElement } from '../protected-route';
import AppHeader from '../app-header/app-header';
import styles from './app.module.css';

function App() {
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <AppHeader />
        <Routes>
          <Route path="/" element={<Constructor />}></Route>
          <Route
            path="/login"
            element={<OnlyPublicElement element={<Login />} />}
          ></Route>
          <Route
            path="/register"
            element={<OnlyPublicElement element={<Register />} />}
          ></Route>
          <Route
            path="/forgot-password"
            element={<OnlyPublicElement element={<ForgotPassword />} />}
          ></Route>
          <Route
            path="/reset-password"
            element={<OnlyPublicElement element={<ResetPassword />} />}
          ></Route>
          <Route
            path="/profile"
            element={<PrivateElement element={<Profile />} />}
          >
            <Route
              path="/profile"
              element={<PrivateElement element={<UserInfo />} />}
            ></Route>
            <Route
              path="orders"
              element={<PrivateElement element={<ProfileOrders />} />}
            />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
