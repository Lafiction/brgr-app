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
  OrdersPage,
  OrderInfoPage,
  FeedPage,
  FeedInfoPage,
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
        
        <Route path='/feed' exact={true}>
          <FeedPage />
        </Route>
        <Route path='/feed/:id' exact={true}>
          <FeedInfoPage />
        </Route>
        <ProtectedRoute path='/profile/orders' exact={true}>
          <OrdersPage />
        </ProtectedRoute>
        <ProtectedRoute path='/profile/orders/:id' exact={true}>
          <OrderInfoPage />
        </ProtectedRoute>
      
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
        <Route path='/brgr-app' exact={true}>
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
