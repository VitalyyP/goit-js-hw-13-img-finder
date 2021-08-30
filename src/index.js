import FetchImages from './js/apiService';
import createCard from './templates/card.hbs';
import * as basicLightbox from 'basiclightbox';

import topFunction from './js/scroll';

import '../node_modules/basiclightbox/dist/basicLightbox.min.css';
import './style.css';

const refForm = document.querySelector('#search-form');
const refGalleryList = document.querySelector('.gallery__list');
const refGallery = document.querySelector('.gallery');
const refBtn = document.querySelector('.btn__load-more');
const refScrollUp = document.querySelector('.scrollup');

const newImage = new FetchImages();
let currentSearchValue = '';

refForm.addEventListener('submit', makeGallery);
refBtn.addEventListener('click', addImagesAndScroll);
refGalleryList.addEventListener('click', openImgInModal);
refScrollUp.addEventListener('click', topFunction);
refBtn.style.visibility = 'hidden';

function makeGallery(e) {
  e.preventDefault();
  newImage.page = 1;
  refBtn.style.visibility = 'hidden';
  getQueryFromInput(e);
  newImage.searchQuery = currentSearchValue;
  addImagestoGallery();
}

function getQueryFromInput(e) {
  currentSearchValue = e.currentTarget.elements.query.value;
}

function addImagestoGallery() {
  newImage.fetchImage().then(data => {
    refGalleryList.innerHTML = createCard(data.hits);
    if (data.hits.length > 11) {
      refBtn.style.visibility = 'visible';
    }
  });
}

function addImagesAndScroll() {
  newImage.fetchImage().then(data => {
    refGalleryList.insertAdjacentHTML('beforeend', createCard(data.hits));
    refGallery.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  });
}

function openImgInModal(e) {
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  const instance = basicLightbox.create(`
    <img src=${e.target.dataset.src} width="800" height="600">
`);
  instance.show();
}
