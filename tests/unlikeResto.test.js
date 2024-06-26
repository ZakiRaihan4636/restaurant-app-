/* eslint-disable no-undef */
import FavoriteRestoIdb from '../src/scripts/data/favorite-resto';
import * as TestFactories from './helpers/testFactories';

describe('Unliking A Resto', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(async () => {
    addLikeButtonContainer();
    await FavoriteRestoIdb.putResto({
      id: 1,
    });
  });

  afterEach(async () => {
    await FavoriteRestoIdb.deleteResto(1);
  });

  it('should display unlike widget when the resto has been liked', async () => {
    await TestFactories.createLikeBottonPresenterWithResto({
      id: 1,
    });

    expect(document.querySelector('[aria-label="unlike this resto"]')).toBeTruthy();
  });

  it('should not displat like widget when the resto has been liked', async () => {
    await TestFactories.createLikeBottonPresenterWithResto({
      id: 1,
    });

    expect(document.querySelector('[arial-label="like this resto"]')).toBeFalsy();
  });

  it('should be able to remote liked resto from the list', async () => {
    await TestFactories.createLikeBottonPresenterWithResto({
      id: 1,
    });

    document.querySelector('[aria-label="unlike this resto"').dispatchEvent(new Event('click'));
    expect(await FavoriteRestoIdb.getAllRestos()).toEqual([]);
  });

  it('should not throw error if the unliked resto is not in the list', async () => {
    await TestFactories.createLikeBottonPresenterWithResto({
      id: 1,
    });

    await FavoriteRestoIdb.deleteResto(1);

    document.querySelector('[aria-label="unlike this resto"]').dispatchEvent(new Event('click'));
    expect(await FavoriteRestoIdb.getAllRestos()).toEqual([]);
  });
});
