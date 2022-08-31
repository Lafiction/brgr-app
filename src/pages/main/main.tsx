import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import clsx from 'clsx';
import Loader from '../../components/loader/loader';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import { TIngredient } from '../../utils/types';
import styles from './main.module.css';

type TItems = {
  allIngredients: TIngredient[];
};

export const MainPage: React.FC<TItems> = ({ allIngredients }) => {
  return (
    <main className={clsx(styles.main, 'mb-15')}>
      {allIngredients ? (
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      ) : (
        <div className='m-30'>
          <p className='text_color_inactive text_type_main-medium mb-20'>Загружаем ингредиенты</p>
          <Loader />
        </div>
      )}
    </main>
  );
}
