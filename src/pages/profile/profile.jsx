import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Redirect, useLocation } from 'react-router-dom';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileMenu } from '../../components/profile-menu/profile-menu';
import { SET_USER } from '../../services/actions/constants';
import { getUser } from '../../services/actions/get-user';
import { updateUser } from '../../services/actions/update-user';
import styles from './profile.module.css';

export function ProfilePage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const form = useSelector((store) => store.user.form);
  const password = useSelector((store) => store.login.form.password);
  const isUpdated = useSelector((store) => store.updateUser.isUpdated);

  const isUser = useSelector((store) => store.user.isUser);
  const updatedForm = useSelector((store) => store.updateUser.form);
  const [saveButton, setSaveButton] = useState(false);

  const [userData, setUserData] = useState({
    name: isUpdated ? updatedForm?.name : form?.name,
    email: isUpdated ? updatedForm?.email : form?.email,
    password: isUpdated ? password : '',
  });

  const refName = useRef(null);
  const refEmail = useRef(null);
  const refPassword = useRef(null);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  if (!isUser) {
    return <Redirect to='/login' />;
  }

  function fillField(evt) {
    setSaveButton(true);
    setUserData({ ...userData, [evt.target.name]: evt.target.value });
    dispatch({
      type: SET_USER,
      payload: { ...form, [evt.target.name]: evt.target.value },
    });
  }

  async function submitForm(evt) {
    evt.preventDefault();
    dispatch(await updateUser(userData));
  }

  const onIconClickName = () => {
    setTimeout(() => refName.current.focus(), 0);
  };
  const onIconClickEmail = () => {
    setTimeout(() => refEmail.current.focus(), 0);
  };
  const onIconClickPassword = () => {
    setTimeout(() => refPassword.current.focus(), 0);
  };

  const cancelEdit = (evt) => {
    evt.preventDefault();
    dispatch(getUser());
    setUserData({ ...form, password: password });
    setSaveButton(false);
  };

  return (
    <div className={styles.container}>
      <ProfileMenu activeLink={'profile'} />
      <form onSubmit={(evt) => submitForm(evt)}>
        <div className='mb-6'>
          <Input
            type='text'
            placeholder='Имя'
            name='name'
            onChange={(evt) => fillField(evt)}
            value={userData.name}
            icon='EditIcon'
            onIconClick={onIconClickName}
            ref={refName}
          />
        </div>
        <div className='mb-6'>
          <Input
            type='text'
            placeholder='Email'
            name='email'
            onChange={(evt) => fillField(evt)}
            value={userData.email}
            icon='EditIcon'
            onIconClick={onIconClickEmail}
            ref={refEmail}
          />
        </div>
        <div className='mb-6'>
          <Input
            type='password'
            placeholder='Пароль'
            name='password'
            onChange={(evt) => fillField(evt)}
            value={userData.password}
            icon='EditIcon'
            onIconClick={onIconClickPassword}
            ref={refPassword}
          />
        </div>
        <div >
          {saveButton && (
            <div className='mr-4'>
              <Button
                type='secondary'
                size='medium'
                onClick={(evt) => cancelEdit(evt)}
              >
                Отмена
              </Button>
            </div>
          )}
          <Button type='primary' size='medium' disabled={!saveButton}>
            Сохранить
          </Button>
        </div>
      </form>
    </div>
  );
}
