import styles from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ webformatURL, largeImageURL, text, onClick }) => (
  <li className={styles.ImageGalleryItem}>
    <img
      src={webformatURL}
      alt={text}
      className={styles.ImageGalleryItem}
      onClick={() => onClick(largeImageURL)}
    />
  </li>
);

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
};

export default ImageGalleryItem;
