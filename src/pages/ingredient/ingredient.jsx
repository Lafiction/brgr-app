import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import styles from './ingredient.module.css';

export function IngredientPage() {
  const history = useHistory();
  const ingredients = useSelector((store) => store.allIngredients.allIngredients);
  const id = history.location.pathname.replace("/ingredients/", "");

  return (
    <div className={styles.container}>
      {ingredients && (
        <IngredientDetails details={ingredients.filter((ingredient) => ingredient._id === id)[0]} />
      )}
    </div>
  );
}
