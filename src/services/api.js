const BASE_URL = 'https://pixabay.com/api/';

const searchParams = new URLSearchParams({
  key: '24464627-f47c997de86c962dcc3f2ff0b',
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
});

//https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12

const api = (searchImgName, page = 1) =>
  fetch(`${BASE_URL}?q=${searchImgName}&page=${page}&${searchParams}`).then(
    response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(new Error('Something went wrong try again'));
    },
  );

export default api;
