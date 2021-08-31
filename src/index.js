import FetchImages from './js/apiService';
import createCard from './templates/card.hbs';
import * as basicLightbox from 'basiclightbox';

import topFunction from './js/scroll';

import '../node_modules/basiclightbox/dist/basicLightbox.min.css';
import './style.css';

const refForm = document.querySelector('#search-form');
const refGallery = document.querySelector('.gallery');
const refBtn = document.querySelector('.btn__load-more');
const refScrollUp = document.querySelector('.scrollup');

const newImage = new FetchImages();

let currentSearchValue = '';
refBtn.style.visibility = 'hidden';
refScrollUp.style.display = 'none';
const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5,
};

refForm.addEventListener('submit', makeGallery);
refBtn.addEventListener('click', addImagesAndScroll);
refGallery.addEventListener('click', openImgInModal);
refScrollUp.addEventListener('click', topFunction);

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
    refGallery.innerHTML = createCard(data.hits);
    if (data.hits.length > 11) {
      refBtn.style.visibility = 'visible';
    }
  });
}

function addImagesAndScroll() {
  newImage.fetchImage().then(data => {
    refGallery.insertAdjacentHTML('beforeend', createCard(data.hits));
   
    console.log(newImage.page);
     if (newImage.page === 3) {
       const observer = new IntersectionObserver(addImagesAndScroll, options);
       observer.observe(refBtn);
     }
   
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

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    refScrollUp.style.display = 'block';
  } else {
    refScrollUp.style.display = 'none';
  }
}

