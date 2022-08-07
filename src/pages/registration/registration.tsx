import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {
  Input
} from '@ya.praktikum/react-developer-burger-ui-components';
import { SET_REGISTRATION } from '../../services/actions/constants';
import { registration } from '../../services/actions/registration';
import styles from './registration.module.css';
import { TRootState } from '../../services/reducers/root-reducer';
import { useAppDispatch } from '../../services/hooks';
import { ButtonFixed } from '../../services/fix-ui-components';

export const RegistrationPage = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const form = useSelector((store: TRootState) => store.registration.form);
  const isUser = useSelector((store: TRootState) => store.user.isUser);

  if (isUser) {
    history.push('/');
  }

  function fillField(evt: React.ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: SET_REGISTRATION,
      payload: { ...form, [evt.target.name]: evt.target.value },
    });
  }

  function submitForm(evt: React.FormEvent<HTMLFormElement>) {
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
          <Input
            type='password'
            placeholder='Пароль'
            name='password'
            value={form.password}
            onChange={(evt) => fillField(evt)}
          />
        </div>
        <div className='mb-20'>
          <ButtonFixed
            type='primary' 
            size='medium'
          >
            Зарегистрироваться
          </ButtonFixed>
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
