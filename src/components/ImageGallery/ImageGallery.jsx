import styles from './ImageGallery.module.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import api from '../../services/api';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Modal from '../Modal/Modal.jsx';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const loaderStyle = {
  position: 'fixed',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
};

class ImageGallery extends Component {
  state = {
    searchImages: null,
    error: null,
    loading: false,
    isModalOpen: false,
    largeImg: null,
  };

  componentDidMount() {
    this.setState({ loading: true });
    this.getImagesFromApi(this.props.searchImgName);
  }

  componentDidUpdate(prevProps, prevState) {
    const prevImgName = prevProps.searchImgName;
    const prevPage = prevProps.page;
    const nextImgName = this.props.searchImgName;
    const nextPage = this.props.page;

    if (prevImgName !== nextImgName) {
      this.setState({ searchImages: null });
    }

    if (prevImgName !== nextImgName || prevPage !== nextPage) {
      this.setState({ loading: true });
      this.getImagesFromApi(nextImgName, nextPage);
    }
  }

  onClose = () => {
    this.setState({ isModalOpen: false });
  };

  getLargeImg = largeImg => {
    this.setState({ largeImg, isModalOpen: true });
  };

  getImagesFromApi = (searchImgName, page) => {
    api(searchImgName, page)
      .then(searchImages => {
        this.setState(preveState => {
          if (preveState.searchImages === null) {
            return { searchImages: [...searchImages.hits] };
          }
          return {
            searchImages: [...preveState.searchImages, ...searchImages.hits],
          };
        });

        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth',
        });
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  };

  render() {
    const { searchImages, loading, error, isModalOpen, largeImg } = this.state;
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
                onClick={this.getLargeImg}
              />
            ))}
        </ul>
        {isModalOpen && <Modal onClose={this.onClose} largeImg={largeImg} />}
        {searchImages && searchImages.length > 11 && this.props.children}
      </>
    );
  }
}

ImageGallery.propTypes = {
  onSubmit: PropTypes.func,
};

export default ImageGallery;
