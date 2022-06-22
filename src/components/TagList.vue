<template>
  <ul class="tag-list">
    <li
      class="tag-default tag-pill tag-outline"
      v-for="(tag, index) of tags"
      :key="`${tag}${index}`"
    >
      <span>{{ tag }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'rwv-tag-list',

  props: {
    tags: {
      type: Array,
      required: true,
    },
  },
};
</script>
