import { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getUser } from '../../services/actions/get-user';
import { logout } from '../../services/actions/logout';
import styles from './profile-menu.module.css';
import { TProfileMenu } from '../../utils/types';
import { useAppDispatch, useAppSelector } from '../../services/hooks';

export const ProfileMenu: React.FC<TProfileMenu> = ({ activeLink }) => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const isUser = useAppSelector(store => store.user.isUser);

  useEffect(() => {
    dispatch(getUser());
    if (!isUser) {
      history.push('/login');
    }
  }, []);

  const logoutUser = () => {
    dispatch(logout());
    history.push('/login');
  };

  return (
    <div className={styles.links}>
      <Link to='/profile' className={styles.link}>Профиль</Link>
      <Link to='/profile/orders' className={styles.link}>История заказов</Link>
      <button
        onClick={logoutUser}
        className='text text_type_main-medium'
      >
        Выход
      </button>
      <p className='text text_type_main-default text_color_inactive mt-20'>
        В этом разделе вы можете изменить свои персональные данные.
      </p>
    </div>
  );
}
