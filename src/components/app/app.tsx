import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import {
  Constructor,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  UserInfo,
  Feed,
} from '../../pages';
import { ProtectedRoute } from '../protected-route';
import AppHeader from '../app-header/app-header';
import styles from './app.module.css';
import CardDetails from '../card-details/card-details';
import { OrderDetails } from '../order-details/order-details';
import { Modal } from '../modal/modal';
import { useSelector } from 'react-redux';
import { getIngredients } from '../../services/actions';
import { useEffect, useCallback } from 'react';
import { ingredients as ingredientsSelector } from '../../services/selectors/selectors';
import { useAppDispatch } from '../../services/hooks';

function App() {
  const { ingredientsLoading, ingredientsFailed, ingredients } =
    useSelector(ingredientsSelector);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className={styles.app}>
        <AppHeader />
        {ingredientsLoading || ingredients.length === 0 ? (
          <p className={styles.warning}>Загрузка...</p>
        ) : ingredientsFailed ? (
          <p className={styles.warning}>Что-то пошло не так...</p>
        ) : (
          <ModalSwitch />
        )}
      </div>
    </BrowserRouter>
  );
}

function ModalSwitch() {
  const location = useLocation();
  const navigate = useNavigate();
  const background = location?.state?.backgroundLocation;

  const processModalClose = useCallback((): void => {
    navigate(background, { replace: true });
  }, [navigate, background]);

  return (
    <div className={styles.main}>
      <Routes location={background || location}>
        <Route path="/" element={<Constructor />}></Route>
        <Route path="/feed" element={<Feed />}></Route>
        <Route
          path="/login"
          element={<ProtectedRoute element={<Login />} anonymous />}
        ></Route>
        <Route
          path="/register"
          element={<ProtectedRoute element={<Register />} anonymous />}
        ></Route>
        <Route
          path="/forgot-password"
          element={<ProtectedRoute element={<ForgotPassword />} anonymous />}
        ></Route>
        <Route
          path="/reset-password"
          element={<ProtectedRoute element={<ResetPassword />} anonymous />}
        ></Route>
        <Route
          path="/profile"
          element={<ProtectedRoute element={<Profile />} />}
        >
          <Route
            path="/profile"
            element={<ProtectedRoute element={<UserInfo />} />}
          ></Route>
          <Route
            path="orders"
            element={<ProtectedRoute element={<ProfileOrders />} />}
          />
        </Route>
        <Route
          path="/ingredients/:id"
          element={
            <div className="pt-20">
              <CardDetails />
            </div>
          }
        ></Route>
        <Route
          path="/feed/:num"
          element={
            <div className="pt-20">
              <OrderDetails />
            </div>
          }
        ></Route>
        <Route
          path="/profile/orders/:num"
          element={
            <ProtectedRoute
              element={
                <div className="pt-20">
                  <OrderDetails />
                </div>
              }
            />
          }
        ></Route>
      </Routes>
      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal onClose={processModalClose}>
                <CardDetails />
              </Modal>
            }
          />
          <Route
            path="/feed/:num"
            element={
              <Modal onClose={processModalClose}>
                <OrderDetails />
              </Modal>
            }
          />
          <Route
            path="/profile/orders/:num"
            element={
              <ProtectedRoute
                element={
                  <Modal onClose={processModalClose}>
                    <OrderDetails />
                  </Modal>
                }
              />
            }
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
