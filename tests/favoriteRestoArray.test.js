/* eslint-disable no-undef */
import {
  itActsAsFavoriteRestoModel,
} from './contracts/favoriteRestoContract';

let favoriteRestos = [];

const FavoriteRestoArray = {
  getResto(id) {
    if (!id) {
      return;
    }

    // eslint-disable-next-line consistent-return
    return favoriteRestos.find((Resto) => Resto.id === id);
  },

  getAllRestos() {
    return favoriteRestos;
  },

  putResto(Resto) {
    // eslint-disable-next-line no-prototype-builtins
    if (!Resto.hasOwnProperty('id')) {
      return;
    }

    // pastikan id ini belum ada dalam daftar favoriteRestos
    if (this.getResto(Resto.id)) {
      return;
    }

    favoriteRestos.push(Resto);
  },

  deleteResto(id) {
    // cara boros menghapus film dengan meng-copy film yang ada
    // kecuali film dengan id == id
    favoriteRestos = favoriteRestos.filter((Resto) => Resto.id !== id);
  },
  async searchRestaurants(query) {
    return (await this.getAllRestos()).filter((resto) => {
      const loweredCaseRestoTitle = (resto.name || '-').toLowerCase();
      const jammedRestoTitle = loweredCaseRestoTitle.replace(/\s/g, '');

      const loweredCaseQuery = query.toLowerCase();
      const jammedQuery = loweredCaseQuery.replace(/\s/g, '');

      return jammedRestoTitle.indexOf(jammedQuery) !== -1;
    });
  },
};

describe('Favorite Resto Array Contract Test Implementation', () => {
  afterEach(() => {
    favoriteRestos = [];
  });

  itActsAsFavoriteRestoModel(FavoriteRestoArray);
});
