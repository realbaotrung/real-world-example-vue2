<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <RwvListErrors :errors="errors" />
          <form @submit.prevent="onPublish(article.slug)">
            <fieldset :disabled="inProgress">
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  v-model.lazy="article.title"
                  placeholder="Article Title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  v-model.lazy="article.description"
                  placeholder="What's this article about?"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  v-model.lazy="article.body"
                  placeholder="Write your article (in markdown)"
                >
                </textarea>
              </fieldset>
              <fieldset class="form-group">
                <!-- When you press enter, your input will be added to tag -->
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  v-model="tagInput"
                  @keypress.enter.prevent="addTag(tagInput)"
                />
                <div class="tag-list">
                  <span
                    class="tag-default tag-pill"
                    v-for="(tag, index) of article.tagList"
                    :key="tag + index"
                  >
                    <i class="ion-close-round" @click="removeTag(tag)"> </i>
                    {{ tag }}
                  </span>
                </div>
              </fieldset>
            </fieldset>
            <button
              :disabled="inProgress"
              class="btn btn-lg pull-xs-right btn-primary"
              type="submit"
            >
              Publish Article
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RwvListErrors from '@/components/ListErrors';
import store from '@/store';

export default {
  // TODO: add debounce function ()
  name: 'rwv-article-edit',

  components: {
    RwvListErrors,
  },

  props: {
    previousArticle: Object,
  },

  data: () => ({
    tagInput: '',
    inProgress: false,
    errors: {},
    article: {
      title: '',
      description: '',
      body: '',
      tagList: [],
    },
  }),

  watch: {
    'article.title': {
      handler(input) {
        console.log('title', input);
      },
    },
    'article.description': {
      handler(input) {
        console.log('description', input);
      },
    },
    'article.body': {
      handler(input) {
        console.log('body', input);
      },
    },
    'article.tagList': {
      handler(input) {
        console.log('tagList', input);
      },
    },
  },

  mounted() {
    this.article = {...this.getArticle()};
  },

  methods: {
    getArticle() {
      return this.$store.getters['article/article'];
    },

    onPublish(slug) {
      const action = slug ? 'article/articleEdit' : 'article/articlePublish';
      this.inProgress = true;

      this.$store
        .dispatch(action, this.article)
        .then(({data}) => {
          this.inProgress = false;
          this.$router.push({
            name: 'article',
            params: {slug: data.article.slug},
          });
        })
        .catch(({response}) => {
          this.inProgress = false;
          this.errors = response.data.errors;
        });
    },

    removeTag(tag) {
      // return new Promise(() => {
      //   this.$store.dispatch('article/articleEditRemoveTag', tag);
      // });

      this.article.tagList = this.article.tagList.filter((t) => t !== tag);
    },

    addTag(tag) {
      // return new Promise(() => {
      //   this.$store.dispatch('article/articleEditAddTag', tag);
      //   this.tagInput = '';
      // });
      this.article.tagList = this.article.tagList.concat([tag]);
    },
  },

  // TODO: Review in Component Guard
  // https://v3.router.vuejs.org/guide/advanced/navigation-guards.html#in-component-guards

  beforeRouteEnter(to, from, next) {
    // If we arrive directly to this url, we need to fetch the article
    return new Promise((reject) => {
      // The beforeRouteEnter guard does NOT have access to 'this', because
      // the guard is called before the navigation is confirmed,
      // thus the new entering component has not even been created yet.
      store
        .dispatch('article/articleResetState')
        .then(() => {
          if (to.params.slug !== undefined) {
            store.dispatch(
              'article/fetchArticle',
              to.params.slug,
              to.params.previousArticle,
            );
          }
        })
        .then(next)
        .catch((error) => reject(error));
    });
  },

  beforeRouteUpdate(to, from, next) {
    // The component is not recreated so we use to hook to reset the state
    return new Promise(() => {
      this.$store.dispatch('article/articleResetState').then(next);
    });
  },

  beforeRouteLeave(to, from, next) {
    // The leave guard is usually used to prevent the user from
    // accidentally leaving the route with unsaved edits.
    // The navigation can be canceled by calling next(false)
    return new Promise(() => {
      this.$store.dispatch('article/articleResetState').then(next);
    });
  },
};
</script>
