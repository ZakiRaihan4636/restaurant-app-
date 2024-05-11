import RestaurantSource from '../../data/therestaurantdb-source';
import UrlParser from '../../routes/url-parser';
import {
  createFormReviewTemplate,
  createLoaderTemplate,
  createRestoDetailTemplate,
  createReviewtemplate,
  createToast,
} from '../templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-initiator';

const Detail = {
  async render() {
    return `
      <h1 class="title__detail">Detail Restaurant</h1>
      <div class="detail"></div>
      <div class="review-costumer"></div>
      <div class="review-from-container"></div>
      <div id="likeButtonContainer"></div>
      ${createLoaderTemplate.show()}
      ${createToast('err', 'bi-x-circle-fill error', 'Data must not be empty.')}
      ${createToast('ch', 'bi-check-circle-fill check', 'Data Succesfully Added')}
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await RestaurantSource.detailRestaurant(url.id);
    const detail = document.querySelector('.detail');
    const review = document.querySelector('.review-costumer');
    review.innerHTML = createReviewtemplate(restaurant);
    const formContainer = document.querySelector('.review-from-container');
    formContainer.innerHTML = createFormReviewTemplate();
    detail.innerHTML = createRestoDetailTemplate(restaurant);
    createLoaderTemplate.hide();
    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      resto: {
        id: restaurant.id,
        name: restaurant.name,
        description: restaurant.description,
        pictureId: restaurant.pictureId,
        rating: restaurant.rating,
        address: restaurant.address,
        city: restaurant.city,
        menus: restaurant.menus,
        categories: restaurant.categories,
        customerReviews: restaurant.customerReviews,
      },
    });
    const nameReviewer = document.querySelector('.name-reviewer');
    const descReviewer = document.querySelector('.review-input-desc');
    const btnReview = document.querySelector('.btn-review');
    const err = document.querySelector('.err');
    const ch = document.querySelector('.ch');

    btnReview.addEventListener('click', async (e) => {
      e.preventDefault();

      if (nameReviewer.value === '' || descReviewer.value === '') {
        // Tampilkan pesan error jika input kosong
        err.classList.add('toast__display');
        setTimeout(() => {
          err.classList.remove('toast__display');
        }, 3000);
      } else {
        try {
          // Kirim ulasan baru ke server
          await RestaurantSource.postReview({
            id: restaurant.id,
            name: nameReviewer.value,
            review: descReviewer.value,
          });

          // Reset input
          nameReviewer.value = '';
          descReviewer.value = '';

          // Tampilkan toast sukses
          ch.classList.add('toast__display');
          setTimeout(() => {
            ch.classList.remove('toast__display');
          }, 3000);

          const updatedRestaurant = await RestaurantSource.detailRestaurant(url.id);
          if (updatedRestaurant) {
            review.innerHTML = '';
            review.innerHTML = createReviewtemplate(updatedRestaurant);
          } else {
            console.error('Gagal memperbarui ulasan: Data ulasan tidak ditemukan');
          }
        } catch (error) {
          console.error('Gagal menyimpan ulasan:', error);
        }
      }
    });
  },
};

export default Detail;
