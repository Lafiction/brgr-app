import styles from './modal-overlay.module.css';
import { TModal } from '../../utils/types';

const ModalOverlay: React.FC<TModal> = ({ onClose }) => {
  return <div className={styles.overlay} onClick={onClose} />;
};

export default ModalOverlay;
