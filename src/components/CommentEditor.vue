<template>
  <div>
    <RwvListErrors :errors="errors" />
    <form class="card comment-form" @submit.prevent="onSubmit(slug, comment)">
      <div class="card-block">
        <textarea
          class="form-control"
          v-model="comment"
          placeholder="Write a comment..."
          rows="3"
        >
        </textarea>
      </div>
      <div class="card-footer">
        <img alt="comment author image" :src="urlUserImage" class="comment-author-img" />
        <button type="submit" class="btn btn-sm btn-primary">Post Comment</button>
      </div>
    </form>
  </div>
</template>

<script>
import RwvListErrors from '@/components/ListErrors';

// TODO: Fix bug :
// 1. After create a new Article, we go to the route .../article/new-article-has-created
//    [Vue warn]: Error in data(): "TypeError: Cannot read properties of undefined (reading 'content')"
// 2. Cannot show author image
// 3. Can not post a comment...

export default {
  name: 'rwv-comment-editor',

  components: {
    RwvListErrors,
  },

  props: {
    slug: {
      type: String,
      required: true,
    },

    content: String,

    urlUserImage: String,
  },

  data: () => ({
    comment: this.content || null,
    errors: {}
  }),

  methods: {
    async onSubmit(slug, comment) {
      try {
        await this.$store.dispatch(`article/commentCreate`, { slug, comment })

        this.comment = null;
        this.errors = {};

        return true;
      } catch (error) {
        this.errors = error.response.data.errors;
        return false;
      }
    }
  }
};
</script>
