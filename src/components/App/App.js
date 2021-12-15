import styles from './App.module.css';
import SearchBar from '../Searchbar/Searchbar.jsx';
import ImageGallery from '../ImageGallery/ImageGallery.jsx';
import Button from '../Button/Button.jsx';

// import React, { Component } from 'react';
import { useState } from 'react';

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

// class App extends Component {
//   state = {
//     searchImgName: '',
//     page: 1,
//   };

//   handelFormSubmit = (searchImgName, page) => {
//     this.setState({ searchImgName, page });
//   };

//   onLoadMore = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }));
//   };

//   render() {
//     return (
//       <div className={styles.App}>
//         <SearchBar onSubmit={this.handelFormSubmit} />
//         {this.state.searchImgName && (
//           <ImageGallery
//             searchImgName={this.state.searchImgName}
//             page={this.state.page}
//           >
//             <Button onClick={this.onLoadMore} />
//           </ImageGallery>
//         )}
//       </div>
//     );
//   }
// }

export default App;
