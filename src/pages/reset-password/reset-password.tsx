import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Input
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './reset-password.module.css';
import { SET_PASSWORD } from '../../services/actions/constants';
import { resetPassword } from '../../services/actions/reset-password';
import { TRootState } from '../../services/reducers/root-reducer';
import { useAppDispatch } from '../../services/hooks';
import { ButtonFixed } from '../../services/fix-ui-components';

export const ResetPasswordPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const form = useSelector((store: TRootState) => store.resetPassword.form);
  const isPasswordReseted = useSelector((store: TRootState) => store.resetPassword.isPasswordReseted);
  const isUser = useSelector((store: TRootState) => store.user.isUser);

  if (isUser) {
    history.push('/');
  }

  const recoveryEmail = useSelector((store: TRootState) => store.forgotPassword.form.email);
  
  if (recoveryEmail.length === 0) {
    history.goBack();
  }
  
  function fillField(evt: React.ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: SET_PASSWORD,
      payload: { ...form, [evt.target.name]: evt.target.value },
    });
  }

  async function submitForm(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    dispatch(resetPassword(form));
    if (isPasswordReseted) {
      history.push('/login');
    }
  }

  function onClick() {
    history.push('/login');
  }

  return (
    <div className={styles.container}>
      <form 
        onSubmit={(evt) => submitForm(evt)} 
        className={styles.form}
      >
        <h1 className='text_type_main-medium mb-5'>
          Восстановление пароля
        </h1>
        <div className='mb-5'>
          <Input
            type='password'
            placeholder='Введите новый пароль'
            name='password'
            onChange={(evt) => fillField(evt)}
            value={form.password}
          />
        </div>
        <div className='mb-5'>
          <Input
            type='text'
            placeholder='Введите код из письма'
            name='token'
            onChange={(evt) => fillField(evt)}
            value={form.token}
          />
        </div>
        <div className='mb-20'>
          <ButtonFixed 
            type='primary' 
            size='medium'
          >
            Восстановить
          </ButtonFixed>
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
