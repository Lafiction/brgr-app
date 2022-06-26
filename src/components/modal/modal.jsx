import React from 'react';
import ReactDOM from 'react-dom';
import {
  CloseIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import clsx from 'clsx';
import styles from './modal.module.css';
import PropTypes from 'prop-types';
import ModalOverlay from '../modal-overlay/modal-overlay';

const Modal = ({ header, children, onClose }) => {
  React.useEffect(() => {
    const closeModal = (evt) => {
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
      document.getElementById('modal')
    )
  );
}

Modal.propTypes = {
	header: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
