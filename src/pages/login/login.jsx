import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation, Redirect } from 'react-router-dom';
import {
  Input,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { SET_AUTH } from '../../services/actions/constants';
import { login } from '../../services/actions/login';
import styles from './login.module.css';

export function LoginPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const isUser = useSelector(store => store.user.isUser);
  const form = useSelector(store => store.login.form);

  function fillField(evt) {
    dispatch({
      type: SET_AUTH,
      payload: { ...form, [evt.target.name]: evt.target.value },
    });
  }

  function submitForm(evt) {
    evt.preventDefault();
    dispatch(login(form));
  }
 
  if (isUser) {
    const {from} = location.state || {from: {pathname: '/'}};
    return <Redirect to={from} />;
  }

  return (
    <form onSubmit={(evt) => submitForm(evt)}>
      <h1 className='text_type_main-medium mb-5'>Вход</h1>
      <div className='mb-5'>
        <Input
          type='email'
          placeholder='e-mail'
          name='email'
          onChange={(evt) => fillField(evt)}
          value={form.email}
        />
      </div>
      <div className='mb-5'>
        <PasswordInput
          type='password'
          placeholder='Пароль'
          name='password'
          onChange={(evt) => fillField(evt)}
          value={form.password}
        />
      </div>
      <div className='mb-20'>
        <Button type='primary' size='medium'>Войти</Button>
      </div>
      <p className='text_type_main-default text_color_inactive mb-4'>
        Вы — новый пользователь?
        <Link 
          to='/registration' 
          className={styles.link}
        >
          Зарегистрироваться
        </Link>
      </p>
      <p className='text_type_main-default text_color_inactive'>
        Забыли пароль?
        <Link 
          to='/forgot-password' 
          className={styles.link}
        >
          Восстановить пароль
        </Link>
      </p>
    </form>
  );
}
