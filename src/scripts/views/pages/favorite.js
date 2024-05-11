import FavoriteRestoIdb from '../../data/favorite-resto';
import {
  createLoaderTemplate,
  createNoDataFavorit,
  createRestoItemTemplate,
} from '../templates/template-creator';

const Favorite = {
  async render() {
    return `
      <div class="container">
        <h1 tabindex="0" class="title__detail">Your Favorite Restaurant</h1>
        <section id="catalogs"></section>
      </div>
      ${createLoaderTemplate.show()}
    `;
  },

  async afterRender() {
    const restos = await FavoriteRestoIdb.getAllRestos();
    const catalogsContainer = document.querySelector('#catalogs');
    createLoaderTemplate.hide();
    if (restos.length === 0) {
      catalogsContainer.innerHTML = createNoDataFavorit();
    } else {
      restos.forEach((restaurant) => {
        catalogsContainer.innerHTML += createRestoItemTemplate(restaurant);
      });
    }
  },

};

export default Favorite;
