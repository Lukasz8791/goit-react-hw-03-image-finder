import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

const Modal = ({ imageUrl, onClose }) => {
  const handleCloseModal = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleClose = () => {
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={handleCloseModal}>
      <div className={styles.modal}>
        {imageUrl && (
          <img src={imageUrl} alt="" onClick={e => e.stopPropagation()} />
        )}
      </div>
    </div>
  );
};

Modal.propTypes = {
  imageUrl: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
