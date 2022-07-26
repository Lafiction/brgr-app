import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { getUser } from '../../services/actions/get-user';
import { logout } from '../../services/actions/logout';
import styles from './profile-menu.module.css';

export function ProfileMenu() {
  const dispatch = useDispatch();
  const history = useHistory();
  const isUser = useSelector((store) => store.user.isUser);

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
