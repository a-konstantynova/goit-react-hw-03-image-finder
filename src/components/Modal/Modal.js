import { Component } from 'react';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

export default class Modal extends Component {
  static propTypes = {
    onCloseModal: PropTypes.func.isRequired,
    largeModalImg: PropTypes.string.isRequired,
    onClickByEscape: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.closeModalByEscape);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModalByEscape);
  }

  closeModalByEscape = e => {
    if (e.key !== 'Escape') {
      return;
    }
    this.props.onClickByEscape();
  };
  render() {
    const { largeModalImg, onCloseModal } = this.props;
    return (
      <div className={s.overlay} onClick={onCloseModal}>
        <div className={s.modal}>
          <img src={largeModalImg} alt="" />
        </div>
      </div>
    );
  }
}
