import LikeButtonInitiator from '../../src/scripts/utils/like-button-initiator';

const createLikeBottonPresenterWithResto = async (resto) => {
  await LikeButtonInitiator.init({
    likeButtonContainer: document.querySelector('#likeButtonContainer'),
    resto,
  });
};

// eslint-disable-next-line import/prefer-default-export
export { createLikeBottonPresenterWithResto };
