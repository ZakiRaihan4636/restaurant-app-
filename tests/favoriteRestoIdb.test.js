/* eslint-disable no-undef */
import FavoriteRestoIdb from '../src/scripts/data/favorite-resto';
import { itActsAsFavoriteRestoModel } from './contracts/favoriteRestoContract';

describe('Favorite resto idb Contract Test Implementation', () => {
  afterEach(async () => {
    (await FavoriteRestoIdb.getAllRestos()).forEach(async (resto) => {
      await FavoriteRestoIdb.deleteResto(resto.id);
    });
  });
  itActsAsFavoriteRestoModel(FavoriteRestoIdb);
});
