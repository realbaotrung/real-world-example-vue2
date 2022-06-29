import {ArticlesService, CommentsService, FavoriteService} from '@/services';

const defaultState = {
  article: {
    author: {},
    title: '',
    description: '',
    body: '',
    tagList: [],
  },

  comments: [],
};

export default {
  namespaced: true,

  state: {...defaultState},

  getters: {
    article(state) {
      return state.article;
    },

    comments(state) {
      return state.comments;
    },
  },

  mutations: {
    SET_ARTICLE(state, payload) {
      state.article = payload;
    },

    SET_COMMENTS(state, payload) {
      state.comments = payload;
    },

    TAG_ADD(state, payload) {
      state.article.tagList = state.article.tagList.concat([payload]);
    },

    TAG_REMOVE(state, payload) {
      state.article.tagList = state.article.tagList.filter(
        (t) => t !== payload,
      );
    },

    RESET_STATE(state) {
      state.article = {...defaultState.article};
      state.comment = defaultState.comments;
    },
  },

  actions: {
    async fetchArticle({commit}, articleSlug, prevArticle) {
      if (prevArticle !== undefined) {
        commit('SET_ARTICLE', prevArticle);
        return;
      }

      try {
        const {data} = await ArticlesService.get(articleSlug);

        commit('SET_ARTICLE', data.article);

        return;
      } catch (error) {
        throw new Error(error);
      }
    },

    async fetchComments({commit}, articleSlug) {
      try {
        const {data} = await CommentsService.get(articleSlug);

        commit('SET_COMMENTS', data.comments);

        return;
      } catch (error) {
        throw new Error(error);
      }
    },

    async commentCreate({dispatch}, payload) {
      try {
        await CommentsService.post(payload.slug, payload.comment);

        dispatch('fetchComments', payload.slug);
      } catch (error) {
        throw new Error(error);
      }
    },

    async commentDestroy({dispatch}, payload) {
      try {
        await CommentsService.destroy(payload.slug, payload.commentId);

        dispatch('fetchComments', payload.slug);

        return;
      } catch (error) {
        throw new Error(error);
      }
    },

    async favoriteAdd({commit}, slug) {
      try {
        const {data} = await FavoriteService.add(slug);

        commit('home/UPDATE_ARTICLE_IN_LIST', data.article, {root: true});
        commit('SET_ARTICLE', data.article);

        return;
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

        return;
      } catch (error) {
        throw new Error(error);
      }
    },

    async articlePublish(context, payload) {
      return ArticlesService.create(payload);
    },

    async articleEdit({state}) {
      return ArticlesService.update(state.article.slug, state.article);
    },

    async articleEditAddTag({commit}, payload) {
      commit('TAG_ADD', payload);
    },

    async articleEditRemoveTag({commit}, payload) {
      commit('TAG_REMOVE', payload);
    },

    async articleDelete(context, payload) {
      try {
        await ArticlesService.destroy(payload);

        return;
      } catch (error) {
        throw new Error(error);
      }
    },

    async articleResetState({commit}) {
      commit('RESET_STATE');
    },
  },
};
