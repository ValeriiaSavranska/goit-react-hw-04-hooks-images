import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
//import { ToastContainer } from 'react-toastify';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import api from '../../services/api';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Modal from '../Modal/Modal.jsx';

import styles from './ImageGallery.module.css';

const loaderStyle = {
  position: 'fixed',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
};

// window.scrollTo({
//   top: document.body.scrollHeight,
//   behavior: 'smooth',
// });

const ImageGallery = ({ searchImgName, page, children }) => {
  const [searchImages, setSearchImages] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [largeImg, setLargeImg] = useState(null);

  useEffect(() => {
    if (searchImgName === '') return;

    const getImagesFromApi = (searchImgName, page) => {
      api(searchImgName, page)
        .then(searchImages => {
          setSearchImages(preveImages => {
            return page === 1
              ? searchImages.hits
              : [...preveImages, ...searchImages.hits];
          });
        })
        .catch(err => setError(err))
        .finally(() => {
          setLoading(false);
        });
    };

    setLoading(true);
    getImagesFromApi(searchImgName, page);
  }, [searchImgName, page]);

  useEffect(() => {
    if (!loading) {
      const timeId = setTimeout(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
        clearTimeout(timeId);
      }, 250);
    }
  }, [loading]);

  const onClose = () => {
    setIsModalOpen(false);
  };

  const getLargeImg = largeImg => {
    setLargeImg(largeImg);
    setIsModalOpen(true);
  };

  return (
    <>
      {error && <p>{error.message}</p>}
      {loading && (
        <Loader
          type="Hearts"
          color="#3F51B5"
          height={250}
          width={250}
          style={{ ...loaderStyle }}
          timeout={3000}
        />
      )}
      <ul className={styles.ImageGallery}>
        {searchImages &&
          searchImages.map(hit => (
            <ImageGalleryItem
              key={hit.id}
              webformatURL={hit.webformatURL}
              largeImageURL={hit.largeImageURL}
              text={hit.tags}
              onClick={getLargeImg}
            />
          ))}
      </ul>
      {isModalOpen && <Modal onClose={onClose} largeImg={largeImg} />}
      {searchImages && searchImages.length > 11 && children}
    </>
  );
};

ImageGallery.propTypes = {
  searchImgName: PropTypes.string,
  page: PropTypes.number,
  children: PropTypes.node,
};

export default ImageGallery;
