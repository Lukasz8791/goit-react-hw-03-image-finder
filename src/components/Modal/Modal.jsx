import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

const Modal = ({ imageUrl, onClose }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    console.log('Adding Event Listener');

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleClose = () => {
    onClose();
    console.log('Closing Modal');
  };

  console.log('Modal Rendering:', imageUrl);

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal}>
        {imageUrl && <img src={imageUrl} alt="" />}
      </div>
    </div>
  );
};

Modal.propTypes = {
  imageUrl: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
