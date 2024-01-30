import PropTypes from 'prop-types';
import styles from './Button.module.css';

const Button = ({ onLoadMore }) => (
  <button type="button" className={styles.button} onClick={onLoadMore}>
    Load more
  </button>
);

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};

export default Button;
