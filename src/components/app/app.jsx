import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Loader from '../loader/loader';
import {getIngredients} from '../../services/api';
import styles from './app.module.css';

function App() {
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(getIngredients());
  }, [dispatch]);

  const {allIngredients} = useSelector(state => state.allIngredients)

  return (
    <>
      <AppHeader />
      <main className={'mb-15'}>
        {allIngredients ? (
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        ) : (
          <div className='m-30'>
            <p className='text text_color_inactive text_type_main-medium mb-20'>Загружаем ингредиенты</p>
            <Loader />
          </div>
        )}
      </main>
    </>
  );
}

export default App;
