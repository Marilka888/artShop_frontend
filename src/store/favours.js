import Vue from 'vue';
import axios from 'axios';

export default ({
  namespaced: true,
  state: {
    favours: [],
  },
  actions: {
    getFavours(context) {
      const api = `${process.env.VUE_APP_APIPATH}/api/favours/all`;
      context.commit('LOADING', true, { root: true });
      axios.get(api)
        .then((response) => {
          if (response.data.success) {
            context.commit('FAVOURS', response.data.favours);
            if (context.rootState.favoriteModules.favoritesLength) {
              context.state.favours.forEach((favourItem, index) => {
                context.rootState.favoriteModules.favorites.forEach((favItem) => {
                  if (favourItem.id === favItem.id) {
                    context.commit('UPDATEFAVOURS', {
                      index,
                      isFavorite: true,
                    });
                  }
                });
              });
            }
          } else {
            context.dispatch('alertMessageModules/updateMessage', {
              message: response.data.message,
              status: 'danger',
            }, { root: true });
          }
          context.commit('LOADING', false, { root: true });
        });
    },
  },
  mutations: {
    FAVOURS(state, payload) {
      state.favours = payload;
    },
    UPDATEFAVOURS(state, { index, isFavorite }) {
      Vue.set(state.favours[index], 'is_favorite', isFavorite);
    },
  },
  getters: {
    favours: state => state.favours,
  },
});
