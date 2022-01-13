import PropTypes from 'prop-types';
import s from './Button.module.css';

export default function Button({ text, onClick }) {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'smooth',
  });
  return (
    <button type="submit" className={s.button} onClick={onClick}>
      {text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
