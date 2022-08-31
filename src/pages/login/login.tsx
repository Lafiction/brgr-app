import { Link, useLocation, Redirect } from 'react-router-dom';
import {
  Input
} from '@ya.praktikum/react-developer-burger-ui-components';
import { SET_AUTH } from '../../services/actions/constants';
import { login } from '../../services/actions/login';
import styles from './login.module.css';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { ButtonFixed } from '../../services/fix-ui-components';

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const location = useLocation<{ from: string }>();
  const isUser = useAppSelector(store => store.user.isUser);
  const form = useAppSelector(store => store.login.form);

  function fillField(evt: React.ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: SET_AUTH,
      payload: { ...form, [evt.target.name]: evt.target.value },
    });
  }

  function submitForm(evt: React.FormEvent<HTMLFormElement>) {
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
        <Input
          type='password'
          placeholder='Пароль'
          name='password'
          onChange={(evt) => fillField(evt)}
          value={form.password}
        />
      </div>
      <div className='mb-20'>
        <ButtonFixed type='primary' size='medium'>
          Войти
        </ButtonFixed>
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
