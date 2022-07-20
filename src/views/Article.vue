<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>
        <RwvArticleMeta :article="article" haveAction />
      </div>
    </div>
    <div class="container page">
      <div class="row article-content">
        <div class="col-xs-12">
          <div v-html="parseMarkdown(article.body)"></div>
          <ul class="tag-list">
            <li v-for="(tag, index) of article.tagList" :key="tag + index">
              <RwvVTag
                :name="tag"
                className="tag-default tag-pill tag-outline"
              />
            </li>
          </ul>
        </div>
      </div>
      <hr />
      <div class="article-actions">
        <RwvArticleMeta :article="article" haveAction />
      </div>
      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <RwvCommentEditor
            v-if="isAuthenticated"
            :slug="slug"
            :urlUserImage="currentUser.image"
          />
          <p v-else>
            <router-link :to="{name: 'login'}">Sign in</router-link>
            or
            <router-link :to="{name: 'register'}">sign up</router-link>
            to add comments on this article.
          </p>
          <RwvComment
            v-for="(comment, index) in comments"
            :key="index"
            :slug="slug"
            :comment="comment"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import store from '@/store';
import {marked} from 'marked';

import RwvArticleMeta from '@/components/ArticleMeta.vue';
import RwvComment from '@/components/Comment.vue';
import RwvCommentEditor from '@/components/CommentEditor.vue';
import RwvVTag from '@/components/VTag.vue';

export default {
  name: 'rwv-article',

  components: {
    RwvArticleMeta,
    RwvComment,
    RwvCommentEditor,
    RwvVTag,
  },

  props: {
    slug: {
      type: String,
      required: true,
    },
  },

  // https://v3.router.vuejs.org/guide/advanced/data-fetching.html#fetching-before-navigation
  beforeRouteEnter(to, from, next) {
    Promise.all([
      store.dispatch('article/fetchArticle', to.params.slug),
      store.dispatch('article/fetchComments', to.params.slug),
    ]).then(() => {
      next();
    });
  },

  computed: {
    ...mapGetters({
      article: 'article/article',
      comments: 'article/comments',
      currentUser: 'auth/currentUser',
      isAuthenticated: 'auth/isAuthenticated',
    }),
  },

  methods: {
    parseMarkdown(content) {
      return marked.parse(content);
    },
  },
};
</script>
