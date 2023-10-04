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
} from '../../pages';
import { ProtectedRoute } from '../protected-route';
import AppHeader from '../app-header/app-header';
import styles from './app.module.css';
import CardDetails from '../card-details/card-details';
import Modal from '../modal/modal';
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
          element={<ProtectedRoute element={<Login />} anonymous={true} />}
        ></Route>
        <Route
          path="/register"
          element={<ProtectedRoute element={<Register />} anonymous={true} />}
        ></Route>
        <Route
          path="/forgot-password"
          element={
            <ProtectedRoute element={<ForgotPassword />} anonymous={true} />
          }
        ></Route>
        <Route
          path="/reset-password"
          element={
            <ProtectedRoute element={<ResetPassword />} anonymous={true} />
          }
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
