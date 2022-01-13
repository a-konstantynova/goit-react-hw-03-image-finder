const API_KEY = '24082682-be762154a7013208570f58292';
const BASE_URL = 'https://pixabay.com/api/?';

export default function fetchImages(searchQuery, page) {
  return fetch(
    `${BASE_URL}q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`No image with query ${searchQuery}`));
  });
}
