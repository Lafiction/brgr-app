import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {
  Input,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { SET_REGISTRATION } from '../../services/actions/constants';
import { registration } from '../../services/actions/registration';
import styles from './registration.module.css';

export function RegistrationPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const form = useSelector((store) => store.registration.form);
  const isUser = useSelector((store) => store.user.isUser);

  if (isUser) {
    history.push('/');
  }

  function fillField(e) {
    dispatch({
      type: SET_REGISTRATION,
      payload: { ...form, [e.target.name]: e.target.value },
    });
  }

  function submitForm(evt) {
    evt.preventDefault();
    dispatch(registration(form));
    history.push('/login');
  }

  function onClick() {
    history.push('/login');
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={(evt) => submitForm(evt)}>
        <h1 className='text text_type_main-medium mb-6'>Регистрация</h1>
        <div className='mb-6'>
          <Input
            type='text'
            placeholder='Имя'
            name='name'
            value={form.name}
            onChange={(evt) => fillField(evt)}
          />
        </div>
        <div className='mb-6'>
          <Input
            type='email'
            placeholder='E-mail'
            name='email'
            value={form.email}
            onChange={(evt) => fillField(evt)}
          />
        </div>
        <div className='mb-6'>
          <PasswordInput
            type='password'
            placeholder='Пароль'
            name='password'
            value={form.password}
            onChange={(evt) => fillField(evt)}
          />
        </div>
        <div className='mb-20'>
          <Button type='primary' size='medium'>
            Зарегистрироваться
          </Button>
        </div>
        <p className='text text_type_main-default text_color_inactive mb-4'>
          Уже зарегистрированы?
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
