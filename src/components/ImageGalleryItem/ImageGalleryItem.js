import PropTypes from 'prop-types';
import shortid from 'shortid';
import s from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ images, onOpenModal }) {
  return images.map(({ webformatURL, tags, largeImageURL }) => (
    <li className={s.item} key={shortid()}>
      <img
        src={webformatURL}
        alt={tags}
        data-source={largeImageURL}
        onClick={onOpenModal}
        className={s.image}
      />
    </li>
  ));
}

ImageGalleryItem.propTypes = {
  image: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string,
    }),
  ),
  onOpenModal: PropTypes.func.isRequired,
};
