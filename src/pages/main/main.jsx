import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Loader from '../../components/loader/loader';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import styles from './main.module.css';

export function MainPage({ allIngredients }) {
  return (
    <main className={'mb-15'}>
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
