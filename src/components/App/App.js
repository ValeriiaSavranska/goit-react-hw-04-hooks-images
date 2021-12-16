import { useState } from 'react';
import styles from './App.module.css';
import SearchBar from '../Searchbar/Searchbar.jsx';
import ImageGallery from '../ImageGallery/ImageGallery.jsx';
import Button from '../Button/Button.jsx';

const App = () => {
  const [searchImgName, setSearchImgName] = useState('');
  const [page, setPage] = useState(1);

  const handelFormSubmit = (searchImgName, page) => {
    setSearchImgName(searchImgName);
    setPage(page);
  };

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className={styles.App}>
      <SearchBar onSubmit={handelFormSubmit} />
      {searchImgName && (
        <ImageGallery searchImgName={searchImgName} page={page}>
          <Button onClick={onLoadMore} />
        </ImageGallery>
      )}
    </div>
  );
};

export default App;
