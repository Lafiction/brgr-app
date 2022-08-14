import { useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import {
  Input
} from '@ya.praktikum/react-developer-burger-ui-components';
import { getUser } from '../../services/actions/get-user';
import { RECOVERY_PASSWORD } from '../../services/actions/constants';
import { forgotPassword } from '../../services/actions/forgot-password';
import styles from './forgot-password.module.css';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { TRootState } from '../../services/reducers/root-reducer';
import { ButtonFixed } from '../../services/fix-ui-components';


export const ForgotPasswordPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const isUser = useSelector((store: TRootState) => store.user.isUser);
  const form = useAppSelector((store: TRootState) => store.forgotPass?.form);
  if (isUser) {
    history.push('/');
  }

  function fillField(evt: React.ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: RECOVERY_PASSWORD,
      payload: { ...form, [evt.target.name]: evt.target.value },
    });
  }

  function submitForm(evt: React.FormEvent<HTMLFormElement>) {
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
            value={form?.email}
            onChange={(evt) => fillField(evt)}
          />
        </div>
        <div className='mb-20'>
          <ButtonFixed size='medium'>
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
