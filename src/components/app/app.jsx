import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
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
import CardDetails from '../card-details/card-details';
import Modal from '../modal/modal';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '../../services/actions/ingredients';
import { useEffect } from 'react';

function App() {
  const { ingredientsLoading, ingredientsFailed, ingredients } = useSelector(
    (store) => store.ingredients
  );

  const dispatch = useDispatch();

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
  const background = location.state && location.state.backgroundLocation;

  const processCardDetailsClose = () => {
    navigate('/', { replace: true });
  };

  return (
    <>
      <Routes location={background || location}>
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
        <Route
          path="/ingredients/:id"
          element={
            <div style={{ paddingTop: '120px' }}>
              <CardDetails />
            </div>
          }
        ></Route>
      </Routes>
      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal onClose={processCardDetailsClose}>
                <CardDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
}

export default App;
