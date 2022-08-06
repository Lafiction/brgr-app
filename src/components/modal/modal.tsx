import React from 'react';
import ReactDOM from 'react-dom';
import {
  CloseIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import clsx from 'clsx';
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { TModal } from '../../utils/types';

const Modal: React.FC<TModal> = (props) => {
  const { children, header, onClose } = props;

  React.useEffect(() => {
    const closeModal = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', closeModal);
    return () => {
      document.removeEventListener('keydown', closeModal);
    };
  }, [onClose]);

  return (
    ReactDOM.createPortal(
      <>
        <div className={clsx(styles.modal, 'p-10')}>
          <div className={styles.header}>
            <div className='text text_type_main-large'>{header}</div>
              <CloseIcon type='primary' onClick={onClose} />
          </div>
          {children}
        </div>
        <ModalOverlay onClose={onClose} />
      </>,
      document.getElementById('modal') as HTMLDivElement
    )
  );
}

export default Modal;
