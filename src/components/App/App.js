import styles from './App.module.css';
import SearchBar from '../Searchbar/Searchbar.jsx';
import ImageGallery from '../ImageGallery/ImageGallery.jsx';
import Button from '../Button/Button.jsx';

import React, { Component } from 'react';

class App extends Component {
  state = {
    searchImgName: '',
    page: 1,
  };

  handelFormSubmit = (searchImgName, page) => {
    this.setState({ searchImgName, page });
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    return (
      <div className={styles.App}>
        <SearchBar onSubmit={this.handelFormSubmit} />
        {this.state.searchImgName && (
          <ImageGallery
            searchImgName={this.state.searchImgName}
            page={this.state.page}
          >
            <Button onClick={this.onLoadMore} />
          </ImageGallery>
        )}
      </div>
    );
  }
}

export default App;
