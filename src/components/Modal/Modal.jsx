import styles from './Modal.module.css';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

const modalRootRef = document.querySelector('#modal-root');

const Modal = ({ onClose, largeImg }) => {
  useEffect(() => {
    window.addEventListener('keydown', onEscPress);

    return () => {
      window.removeEventListener('keydown', onEscPress);
    };
  });

  const onEscPress = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={styles.Overlay} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <img src={largeImg} alt="" />
      </div>
    </div>,
    modalRootRef,
  );
};

Modal.propTypes = {
  onClose: PropTypes.func,
  largeImg: PropTypes.string,
};

export default Modal;
