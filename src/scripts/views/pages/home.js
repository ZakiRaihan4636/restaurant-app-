import RestaurantSource from '../../data/therestaurantdb-source';
import {
  createRestoItemTemplate,
  createLoaderTemplate,
} from '../templates/template-creator';

const Home = {
  async render() {
    return `
      <section class="hero">

      <div tabindex="0" class="hero__tagline">
        <h1 class="hero__title">Explore Culinary Delights with <span class="spotlight">Kulinera</span></h1>
        <p class="hero__subtitle">Discover Popular Nearby Restaurants</p>
      </div>
    </section>
    <div class="container">
      <h2 tabindex="0" class="title">Explore Restaurant</h2>
      <section id="catalogs"></section>
      ${createLoaderTemplate.show()}
    </div>
    `;
  },

  async afterRender() {
    const resto = await RestaurantSource.getRestaurant();
    const catalogsContainer = document.querySelector('#catalogs');
    if (resto) {
      resto.restaurants.forEach((restaurant) => {
        catalogsContainer.innerHTML += createRestoItemTemplate(restaurant);
      });
      createLoaderTemplate.hide();
    }
  },
};

export default Home;
