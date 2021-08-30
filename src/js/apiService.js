// import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '23134981-bd961700c800aa88c1e42f5d0';

export default class fetchImages {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImage(searchQuery) {
    const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${KEY}`;

    return fetch(url)
      .then(response => response.json())
      .then(this.page +=1)
      .catch(err => console.log(err));
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}