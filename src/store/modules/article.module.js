import {ArticlesService, FavoriteService} from '@/services';

export default {
  namespaced: true,

  state: {},

  getters: {},

  mutations: {
    SET_ARTICLE(state, payload) {
      state.article = payload;
    },
  },

  actions: {
    // TODO: articleSlug and development next

    // async fetchArticle({commit}, articleSlug, prevArticle = {}) {
      // if (prevArticle !== {}) {
        
      // }
    //   try {
    //     const {data} = await FavoriteService.add(articleSlug);

    //     commit('home/UPDATE_ARTICLE_IN_LIST', data.article, {root: true});
    //     commit('SET_ARTICLE', data.article);
    //   } catch (error) {
    //     throw new Error(error);
    //   }
    // },

    async favoriteAdd({commit}, slug) {
      try {
        const {data} = await FavoriteService.add(slug);

        commit('home/UPDATE_ARTICLE_IN_LIST', data.article, {root: true});
        commit('SET_ARTICLE', data.article);
      } catch (error) {
        throw new Error(error);
      }
    },

    async favoriteRemove({commit}, slug) {
      try {
        const {data} = await FavoriteService.remove(slug);

        // Update list as well. This allows us to favorite an article
        // in the Home View
        commit('home/UPDATE_ARTICLE_IN_LIST', data.article, {root: true});
        commit('SET_ARTICLE', data.article);
      } catch (error) {
        throw new Error(error);
      }
    },

    async articleDelete(context, payload) {
      try {
        await ArticlesService.destroy(payload)
      } catch (error) {
        throw new Error(error)
      }
    }
  },
};
