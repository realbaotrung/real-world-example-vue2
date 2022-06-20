import {ApiService} from './api.service';

export const TagsService = {
  get() {
    return ApiService.get('tags');
  },
};
