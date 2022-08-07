import { useEffect } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route/protected-route';
import AppHeader from '../app-header/app-header';
import { getIngredients } from '../../services/actions/get-ingredients';
import { getUser } from '../../services/actions/get-user';
import {
  LoginPage,
  MainPage,
  RegistrationPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  NotFoundPage,
  IngredientPage,
} from '../../pages';
import { TLocation } from '../../utils/types';
import { useAppDispatch, useAppSelector } from '../../services/hooks';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const location = useLocation<TLocation>();
  const action: boolean = history.action === 'PUSH' || history.action === 'REPLACE';
  const main = action && location.state && location.state.main;
  
  useEffect(()=> {
    dispatch(getIngredients());
    dispatch(getUser());
  }, [dispatch]);

  const { allIngredients } = useAppSelector(state => state.allIngredients);

  return (
    <>
      <AppHeader />
      <Switch location={main || location}>
        <Route path='/login' exact={true}>
          <LoginPage />
        </Route>
        
        <ProtectedRoute path='/profile' exact={true}>
          <ProfilePage />
        </ProtectedRoute>

        <Route path='/registration' exact={true}>
          <RegistrationPage />
        </Route>
        <Route path='/forgot-password' exact={true}>
          <ForgotPasswordPage />
        </Route>
        <Route path='/reset-password' exact={true}>
          <ResetPasswordPage />
        </Route>
        <Route path='/' exact={true}>
          <MainPage allIngredients={allIngredients} />
        </Route>
        <Route path='/ingredients/:id' exact={true}>
          <IngredientPage />
        </Route>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
