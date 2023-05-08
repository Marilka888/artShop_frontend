export default ({
  namespaced: true,
  state: {
    favorites: {},
    favoritesLength: 0,
  },
  actions: {
    getFavorite(context) {
      const favoriteData = JSON.parse(localStorage.getItem('favoriteData')) || [];
      context.commit('FAVORITES', favoriteData);
      context.commit('FAVORITES_LENGTH', favoriteData.length);
      context.dispatch('favoursModules/getFavours', { isPagination: false }, { root: true });
    },
    addToFavorite(context, favour) {
      const favoriteData = {
        id: favour.id,
        title: favour.title,
      };
      context.commit('PUSH_FAVORITE', favoriteData);
      localStorage.setItem('favoriteData', JSON.stringify(context.state.favorites));
      context.dispatch('getFavorite');
      context.dispatch('alertMessageModules/updateMessage', {
        message: 'Добавлено в избранное',
        status: 'success',
      }, { root: true });
    },
    removeFavorite(context, {
      favoriteItem,
      delall,
    }) {
      if (delall) {
        localStorage.removeItem('favoriteData');
      } else {
        context.commit('REMOVE_FAVORITE', favoriteItem);
        localStorage.setItem('favoriteData', JSON.stringify(context.state.favorites));
      }
      context.dispatch('getFavorite');
      context.dispatch('alertMessageModules/updateMessage', {
        message: 'Удалено из избранного',
        status: 'warning',
      }, { root: true });
    },
  },
  mutations: {
    FAVORITES(state, payload) {
      state.favorites = payload;
    },
    FAVORITES_LENGTH(state, payload) {
      state.favoritesLength = payload;
    },
    PUSH_FAVORITE(state, favorite) {
      state.favorites.push(favorite);
    },
    REMOVE_FAVORITE(state, favorite) {
      state.favorites.forEach((item, index) => {
        if (item.id === favorite.id) {
          state.favorites.splice(index, 1);
        }
      });
    },
  },
  getters: {
    favorites: state => state.favorites,
    favoritesLength: state => state.favoritesLength,
  },
});
