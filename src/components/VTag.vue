<template>
  <router-link :to="homeRoute" :class="tagClass">{{ name }}</router-link>
</template>

<script>
export default {
  name: 'rwv-v-tag',

  props: {
    name: {
      type: String,
      required: true,
    },
  },

  data:() => ({
    tagClass: 'tag-pill tag-default'
  }),

  computed: {
    homeRoute() {
      return {name: 'home-tag', params: {tag: this.name}};
    },
  },
};
</script>
