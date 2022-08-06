import { useHistory } from 'react-router-dom';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import styles from './ingredient.module.css';
import { TIngredient } from '../../utils/types';
import { useAppSelector } from '../../services/hooks';

export function IngredientPage() {
  const history = useHistory();
  const ingredients = useAppSelector(state => state.allIngredients);
  const id = history.location.pathname.replace('/ingredients/', '');

  return (
    <div className={styles.container}>
      {ingredients && (
        <IngredientDetails details={ingredients.filter((ingredient: TIngredient) => ingredient._id === id)[0]} />
      )}
    </div>
  );
}
