import ApiService from './api.service';

const TagsService = {
  get() {
    return ApiService.get('tags');
  },
};

export default TagsService;
