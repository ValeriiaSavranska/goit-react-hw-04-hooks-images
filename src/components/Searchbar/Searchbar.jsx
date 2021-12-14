import styles from './Searchbar.module.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ImSearch } from 'react-icons/im';

class SearchBar extends Component {
  state = {
    searchImgName: '',
    page: 1,
  };

  handelChange = event => {
    this.setState({ searchImgName: event.currentTarget.value.toLowerCase() });
  };

  handelSubmit = event => {
    event.preventDefault();
    if (this.state.searchImgName.trim() === '') return;

    this.props.onSubmit(this.state.searchImgName, this.state.page);
    this.setState({ searchImgName: '', page: 1 });
  };

  render() {
    return (
      <header className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={this.handelSubmit}>
          <button type="submit" className={styles.SearchFormButton}>
            <ImSearch
              style={{ width: '25px', height: '30px', paddingTop: '3px' }}
            />
          </button>

          <input
            className={styles.SearchFormInput}
            name="searchImgName"
            value={this.state.searchImgName}
            onChange={this.handelChange}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

SearchBar.propTypes = {
  searchImgName: PropTypes.string,
  page: PropTypes.number,
};

export default SearchBar;
