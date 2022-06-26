import styles from './ingredient-details.module.css';
import PropTypes from 'prop-types';
import burgerPropTypes from '../../utils/types';

const IngredientDetails = ({ data }) => {
  return (
    <>
      <img src={data.image_large} />
      <div className='text text_type_main-medium mb-10'>{data.name}</div>
      <div className={styles.details}>
        <div className={styles.detail}>
          <span className={'text_type_main-default text_color_inactive mb-1'}>Калории, ккал</span>
          <span className={'text_type_main-medium text_color_inactive'}>{data.calories}</span>
        </div>
        <div className={styles.detail}>
          <span className={'text_type_main-default text_color_inactive mb-1'}>Белки, г</span>
          <span className={'text_type_main-medium text_color_inactive'}>{data.proteins}</span>
        </div>
        <div className={styles.detail}>
          <span className={'text_type_main-default text_color_inactive mb-1'}>Жиры, г</span>
          <span className={'text_type_main-medium text_color_inactive'}>{data.fat}</span>
        </div>
        <div className={styles.detail}>
          <span className={'text_type_main-default text_color_inactive mb-1'}>Углеводы, г</span>
          <span className={'text_type_main-medium text_color_inactive'}>{data.carbohydrates}</span>
        </div>
      </div>
    </>
  );
}

IngredientDetails.propTypes = {
  data: PropTypes.arrayOf(burgerPropTypes).isRequired,
};

export default IngredientDetails;
