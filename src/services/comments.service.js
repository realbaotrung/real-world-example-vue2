import ApiService from './api.service';

const CommentsService = {
  get(slug) {
    if (typeof slug !== 'string') {
      throw Error(
        '[RWV] CommentsService.get() articles slug required to fetch comments.',
      );
    }

    return ApiService.get('articles', `${slug}/comments`);
  },
  post(slug, payload) {
    return ApiService.post(`articles/${slug}/comments`, {
      comment: {body: payload},
    });
  },
  destroy(slug, commentId) {
    return ApiService.delete(`articles/${slug}/comments/${commentId}`);
  },
};

export default CommentsService;
