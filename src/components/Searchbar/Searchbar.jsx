import styles from './Searchbar.module.css';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { ImSearch } from 'react-icons/im';

const SearchBar = ({ onSubmit }) => {
  const [searchImgName, setSearchImgName] = useState('');
  const [page, setPage] = useState(1);

  const handelChange = event => {
    setSearchImgName(event.currentTarget.value.toLowerCase());
  };

  const handelSubmit = event => {
    event.preventDefault();
    if (searchImgName.trim() === '') return;

    onSubmit(searchImgName, page);
    setSearchImgName('');
    setPage(1);
  };

  return (
    <header className={styles.Searchbar}>
      <form className={styles.SearchForm} onSubmit={handelSubmit}>
        <button type="submit" className={styles.SearchFormButton}>
          <ImSearch
            style={{ width: '25px', height: '30px', paddingTop: '3px' }}
          />
        </button>

        <input
          className={styles.SearchFormInput}
          name="searchImgName"
          value={searchImgName}
          onChange={handelChange}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func,
};

export default SearchBar;
