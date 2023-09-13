import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProvideAuth } from '../../utils/auth';
import {
  Constructor,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
} from '../../pages';
import { ProtectedRouteElement } from '../protected-route';
import AppHeader from '../app-header/app-header';
import styles from './app.module.css';

function App() {
  return (
    <ProvideAuth>
      <BrowserRouter>
        <div className={styles.app}>
          <AppHeader />
          <Routes>
            <Route
              path="/"
              element={<ProtectedRouteElement element={<Constructor />} />}
            ></Route>
            <Route
              path="/login"
              element={<ProtectedRouteElement element={<Login />} />}
            ></Route>
            <Route
              path="/register"
              element={<ProtectedRouteElement element={<Register />} />}
            ></Route>
            <Route
              path="/forgot-password"
              element={<ProtectedRouteElement element={<ForgotPassword />} />}
            ></Route>
            <Route
              path="/reset-password"
              element={<ProtectedRouteElement element={<ResetPassword />} />}
            ></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </ProvideAuth>
  );
}

export default App;
