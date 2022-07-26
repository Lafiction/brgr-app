import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { getUser } from '../../services/actions/get-user';
import { RECOVERY_PASSWORD } from '../../services/actions/constants';
import { forgotPassword } from '../../services/actions/forgot-password';
import styles from './forgot-password.module.css';

export function ForgotPasswordPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const isUser = useSelector(store => store.user.isUser);
  const form = useSelector(store => store.forgotPassword.form);
  if (isUser) {
    history.push('/');
  }

  function fillField(evt) {
    dispatch({
      type: RECOVERY_PASSWORD,
      payload: { ...form, [evt.target.name]: evt.target.value },
    });
  }

  function submitForm(evt) {
    evt.preventDefault();
    dispatch(forgotPassword(form));
    dispatch(getUser());
    history.push('/reset-password');
  }

  function onClick() {
    history.push('/login');
  }

  return (
    <div className={styles.container}>
      <form onSubmit={(evt) => submitForm(evt)}>
        <h1 className='text_type_main-medium mb-5'>
          Восстановление пароля
        </h1>
        <div className='mb-5'>
          <Input
            type='email'
            placeholder='Укажите e-mail'
            name='email'
            value={form.email}
            onChange={(evt) => fillField(evt)}
          />
        </div>
        <div className='mb-20'>
          <Button size='medium'>
            Восстановить
          </Button>
        </div>
        <p className='text_type_main-default text_color_inactive mb-5'>
          Вспомнили пароль?
          <Link 
            to='/login' 
            className={styles.link}
            onClick={onClick}
          >
            Войти
          </Link>
        </p>
      </form>
    </div>
  );
}
