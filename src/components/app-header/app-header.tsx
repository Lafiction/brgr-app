import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import style from './app-header.module.css';

const AppHeader: React.FC = () => {
  return (
    <header className={'pt-10 pb-10 pl-5 pr-5'}>
      <nav className={style.navButtons}>
        <NavLink
          to='/'
          className={style.navButton}
        >
          <BurgerIcon type='primary' />
          <span className='text_type_main-default pl-2 pr-10'>Конструктор</span>
        </NavLink>
        <NavLink
          to='/feed'
          className={style.navButton}
        >
          <ListIcon type='secondary' />
          <span className='text_type_main-default text_color_inactive pl-2'>Лента заказов</span>
        </NavLink>
      </nav>
      
      <NavLink
        to='/'
        className={style.logo}
      >
        <Logo />
      </NavLink>

      <NavLink 
        to='/profile'
        className={style.navButton}
      >
        <ProfileIcon type='secondary' />
        <span className='text_type_main-default text_color_inactive pl-2'>Личный кабинет</span>
      </NavLink>
    </header>
  );
};

export default AppHeader;
