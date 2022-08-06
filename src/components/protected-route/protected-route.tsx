import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { getCookie } from '../../utils/cookie';
import { getUser } from '../../services/actions/get-user';

import { TRootState } from '../../services/reducers/root-reducer';

export const ProtectedRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const isUser = useSelector((store: TRootState) => store.user.isUser);
  const isToken = getCookie('accessToken');
  const [isUserLoaded, setUserLoaded] = useState(false);

  const init = async () => {
    await getUser();
    setUserLoaded(true);
  };

  useEffect(() => {
    init();
  }, []);

  if (!isUserLoaded) {
    return null;
  }

  if (!isUser && !isToken) {
    return (
      <Route
        {...rest}
        render={({ location }) => (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )}
      />
    );
  }
  
  return <Route {...rest} render={({ location }) => children as any} />;
}
