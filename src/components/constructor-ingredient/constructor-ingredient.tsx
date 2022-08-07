import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import {
  DragIcon,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './constructor-ingredient.module.css';
import { DELETE_INGREDIENT } from '../../services/actions/constants';
import { TIngredient } from '../../utils/types';

type TIngredientPropTypes = {
  _id: string;
  dragId: string;
  payload: TIngredient;
};

type TOrderedIngredient = {
  item: TIngredientPropTypes;
  index: number;
  moveIngredient: (item: number, index: number) => void;
}

type TClientOffset = {
  x: number;
  y: number;
};

const ConstructorIngredient: React.FC<TOrderedIngredient> = ({
  item,
  index,
  moveIngredient,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();
  const [{handlerId}, drop] = useDrop({
    accept: 'item',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      };
    },
    hover(item: any, monitor) {
      if (!ref.current) {
        return;
      }
      if (item.index === index) {
        return;
      }

      const hoverMiddleY = (ref.current?.getBoundingClientRect().bottom - ref.current?.getBoundingClientRect().top) / 2;
      const clientOffset = monitor.getClientOffset() as TClientOffset;
      const hoverClientY = clientOffset.y - ref.current?.getBoundingClientRect().top;

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

  //drag(drop(ref));

  return (
    <div className={styles.elementContainer}
      key={item.payload._id}
      ref={ref}
      onDrop={(evt) => evt.preventDefault()}
      data-handler-id={handlerId}
    >
      <div className={styles.dragIcon}>
        <DragIcon type='primary'/>
      </div>
      <div className={styles.ingredient}>
        <ConstructorElement
          text={item.payload.name}
          price={item.payload.price}
          thumbnail={item.payload.image_mobile}
          handleClose={() => deleteItem()}
        />
      </div>
    </div>
  );
}

export default ConstructorIngredient;
