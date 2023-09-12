import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ProvideAuth } from '../../utils/auth';
import { Constructor, Login } from '../../pages';
import { ProtectedRouteElement } from '../protected-route';
import AppHeader from '../app-header/app-header';
import styles from './app.module.css';

function App() {
  return (
    <ProvideAuth>
      <BrowserRouter>
        <div className={styles.app}>
          <AppHeader />
          <Switch>
            <Route exact path="/">
              <ProtectedRouteElement element={<Constructor />} />
            </Route>
            <Route path="/login">
              <ProtectedRouteElement element={<Login />} />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </ProvideAuth>
  );
}

export default App;
