import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';
import s from './ImageGallery.module.css';

export default function ImageGallery({ images, onOpenModal }) {
  return (
    <ul className={s.gallery}>
      <ImageGalleryItem images={images} onOpenModal={onOpenModal} />
    </ul>
  );
}

ImageGallery.propTypes = {
  onOpenModal: PropTypes.func.isRequired,
};
