import {useRef} from 'react';
import {useDispatch} from 'react-redux';
import {useDrag, useDrop} from 'react-dnd';
import PropTypes from 'prop-types';
import {
  DragIcon,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './constructor-ingredient.module.css';
import {DELETE_INGREDIENT} from '../../services/actions/constants';
import {ingredientPropTypes} from '../../utils/types';

export default function ConstructorIngredient({item, index, moveIngredient}) {
  const dispatch = useDispatch();
  const [{handlerId}, drop] = useDrop({
    accept: 'item',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      if (item.index === index) {
        return;
      }
      const hoverMiddleY = (ref.current?.getBoundingClientRect().bottom - ref.current?.getBoundingClientRect().top) / 2;
      const hoverClientY = monitor.getClientOffset().y - ref.current?.getBoundingClientRect().top;
      if ((item.index < index && hoverClientY < hoverMiddleY) || (item.index > index && hoverClientY > hoverMiddleY)) {
        return;
      }
      moveIngredient(item.index, index);
      item.index = index;
    }
  });

  const [{isDragging}, drag] = useDrag({
    type: 'item',
    item: {index},
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  const deleteItem = () => {
    const id = item.payload._id;
    dispatch({
      type: DELETE_INGREDIENT,
      index,
      id
    });
  };

  const ref = useRef(null);

  return (
    <div className={styles.elementContainer}
      key={item.payload._id}
      ref={drag(drop(ref))}
      onDrop={(evt) => evt.preventDefault()}
      data-handler-id={handlerId}
    >
      <div className={styles.dragIcon}>
        <DragIcon/>
      </div>
      <div className={styles.ingredient}>
        <ConstructorElement
          text={item.payload.name}
          price={item.payload.price}
          thumbnail={item.payload.image_mobile}
          handleClose={evt => deleteItem(evt.target)}
        />
      </div>
    </div>
  );
}

ConstructorIngredient.propTypes = {
  item: ingredientPropTypes.isRequired,
  index: PropTypes.number.isRequired,
  moveIngredient: PropTypes.func.isRequired
};
