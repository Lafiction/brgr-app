import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  let location = useLocation();
  const action = history.action === 'push' || history.action === 'replace';
  let main = action && location.state && location.state.main;
  
  useEffect(()=> {
    dispatch(getIngredients());
    dispatch(getUser());
  }, [dispatch]);

  const isUser = useSelector(store => store.user.isUser);
  const { allIngredients } = useSelector(state => state.allIngredients);

  return (
    <>
      <AppHeader />
      { isUser ? 
          <div>
            {'user '}
          </div> 
        : 
          <div>
            {'не user '}
          </div> 
      }
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
