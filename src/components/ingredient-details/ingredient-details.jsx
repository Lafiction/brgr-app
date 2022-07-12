import styles from './ingredient-details.module.css';
import burgerPropTypes from '../../utils/types';

const IngredientDetails = ({details}) => {
  return (
    <>
      <img src={details.image_large} alt={details.name} className='mt-15 mb-5'/>
      <div className='text text_type_main-medium mb-10'>{details.name}</div>
      <div className={styles.details}>
        <div className={styles.detail}>
          <span className={'text_type_main-default text_color_inactive mb-1'}>Калории, ккал</span>
          <span className={'text_type_main-medium text_color_inactive'}>{details.calories}</span>
        </div>
        <div className={styles.detail}>
          <span className={'text_type_main-default text_color_inactive mb-1'}>Белки, г</span>
          <span className={'text_type_main-medium text_color_inactive'}>{details.proteins}</span>
        </div>
        <div className={styles.detail}>
          <span className={'text_type_main-default text_color_inactive mb-1'}>Жиры, г</span>
          <span className={'text_type_main-medium text_color_inactive'}>{details.fat}</span>
        </div>
        <div className={styles.detail}>
          <span className={'text_type_main-default text_color_inactive mb-1'}>Углеводы, г</span>
          <span className={'text_type_main-medium text_color_inactive'}>{details.carbohydrates}</span>
        </div>
      </div>
    </>
  );
}

IngredientDetails.propTypes = {
  details: burgerPropTypes.isRequired,
};

export default IngredientDetails;
