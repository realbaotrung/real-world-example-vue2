import {ApiService} from './api.service';

export const ArticlesService = {
  query(type, params) {
    return ApiService.query(
      'articles' + `${type === 'feed' ? '/feed' : ''}`,
      params,
    );
  },
  get(slug) {
    return ApiService.get('articles', slug);
  },
  create(params) {
    return ApiService.post('articles', {article: params});
  },
  update(slug, params) {
    return ApiService.update('articles', slug, {article: params});
  },
  destroy(slug) {
    return ApiService.delete(`articles/${slug}`);
  },
};

/*
eslint
  no-useless-concat: 0
*/
