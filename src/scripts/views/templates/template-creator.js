import CONFIG from '../../globals/config';

const createRestoItemTemplate = (restaurant) => `
  <div tabindex="0" class="card">
    <div class="card-img">
      <div class="city-label">
      <h3 tabindex="0" class="city-label-text">${restaurant.city}</h3>
      </div>
        <picture>
          <source class="lazyload" media="(max-width: 600px)" srcset="${CONFIG.BASE_IMAGE_URL_SM + restaurant.pictureId}">
          <img class="image" src="${CONFIG.BASE_IMAGE_URL_MD + restaurant.pictureId}" alt="${restaurant.name}">
        </picture>
      </div>
      <div class="card-body">
      <div class="rating">
      <i class="fas fa-star"></i>
      <span tabindex="0">${restaurant.rating}</span>
      </div>
      <h3 class="card-title">
        <a class="cta-restaurant" tabindex="0" href="/#/detail/${restaurant.id}">${restaurant.name}</a>
      </h3>
      <p tabindex="0" class="card-text">${restaurant.description.substring(0, 200)}...</p>
    </div>
  </div>
`;

//  Loop Categories
const categoryRestaurant = (restaurant) => {
  const categories = restaurant.categories.map((category) => `<div tabindex="0" class="item">${category.name}</div>`).join('');
  return categories;
};

const foodRestaurant = (restaurant) => {
  const foodMenus = restaurant.menus.foods.map((food) => `<div tabindex="0" class="item">${food.name}</div>`).join('');
  return foodMenus;
};

const drinkRestaurant = (restaurant) => {
  const drinkMenus = restaurant.menus.drinks.map((drink) => `<div tabindex="0" class="item">${drink.name}</div>`).join('');
  return drinkMenus;
};

const reviewContumer = (restaurant) => {
  const consumerReviews = restaurant.customerReviews.map((review) => `
  <div class="review">
    <div class="review-header">
    <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="User Avatar" class="avatar">
    <div class="review-info">
      <h3 tabindex="0" class="review-author">${review.name}</h3>
      <p tabindex="0" class="review-date">${review.date}</p>
    </div>
    </div>
    <div class="review-body">
      <p tabindex="0" class="review-text">"${review.review}"</p>
    </div>
  </div>
  `).join('');
  return consumerReviews;
};

const createRestoDetailTemplate = (restaurant) => `
  <div class="detail__image">
  <img tabindex="0" class="restaurant-img" height="100%" width="100%" src="${CONFIG.BASE_IMAGE_URL_MD + restaurant.pictureId}" alt="${restaurant.name}">
  </div>
  <div class="detail__restaurant">
    <span tabindex="0" class="name__detail">${restaurant.name}</span>
      <div class="rating">
      <i class="fas fa-star"></i> 
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="fas fa-star-half-alt"></i>
      <span tabindex="0">${restaurant.rating}</span> <span class="location" tabindex="0"><i class="fas fa-location-dot"></i>${restaurant.city}, ${restaurant.address}</span>
      </div>
      <p tabindex="0">${restaurant.description}</p>
      <p tabindex="0"><strong>Categories</strong></p>
    <div class="categories">
    ${categoryRestaurant(restaurant)}
    </div>
      <p><strong>Foods Menus</strong></p>
    <div class="menus">
    ${foodRestaurant(restaurant)}
    </div>
    <p><strong>Drinks Menus</strong></p>
    <div class="menus">
      ${drinkRestaurant(restaurant)}
    </div>
  </div>
`;

const createLikeButtonTemplate = () => `
  <button aria-label="like this resto" id="likeButton" class="like">
  <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this resto" id="likeButton" class="like">
  <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

const createReviewtemplate = (restaurant) => `
  <h2>Customer Reviews</h2>
  <div class="reviews-container">
  ${reviewContumer(restaurant)}
  </div>
`;

const createFormReviewTemplate = () => `
  <h2 class="title__detail">Add Review</h2>
  <div class="review-form-container">
    <div class="form-group">
      <label for="name">Your Name:</label>
      <input class="name-reviewer" type="text" id="name" name="name" required>
    </div>
    <div class="form-group">
      <label for="description">Review Description:</label>
      <textarea class="review-input-desc" id="description" name="description" rows="4" required></textarea>
    </div>
    <button class="btn-review" type="submit">Submit Review</button>
  </div>
`;

const createNoDataFavorit = () => `
  <div class="no-data">
    <h2 class="alert">Your favorites list is empty. Start adding your favorite items now!</h2> 
  </div>
`;

const createLoaderTemplate = {
  show() {
    return `
    <div class="loader-container">
      <div class="loader"></div>
    </div>
    `;
  },
  hide() {
    document.querySelector('.loader-container').remove();
  },
};

const createToast = (ctn, icon, msg) => `
<div class="toast__container  ${ctn}">
  <i class="${icon} bi "></i>
  <p class="message">${msg}</p>
</div>
`;

export {
  createRestoItemTemplate,
  createRestoDetailTemplate,
  createLikeButtonTemplate,
  createLikedButtonTemplate,
  createReviewtemplate,
  createFormReviewTemplate,
  createLoaderTemplate,
  createToast,
  createNoDataFavorit,
};