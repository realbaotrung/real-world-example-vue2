<template>
  <nav>
    <ul class="pagination">
      <li
        v-for="page in pages"
        :data-test="`page-link-${page}`"
        :key="page"
        :class="paginationClass(page)"
        @click.prevent="changePage(page)"
      >
        <a class="page-link" href>{{ page }}</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'rwv-v-pagination',

  props: {
    pages: {
      type: Array,
      required: true,
    },

    currentPage: {
      type: Number,
      required: true,
    },
  },

  methods: {
    changePage(gotoPage) {
      if (gotoPage === this.currentPage) return;

      // ======================================================================
      // TODO: Review emitting events in the pattern of "update:myPropName"
      // https://v2.vuejs.org/v2/guide/components-custom-events?redirect=true#sync-Modifier
      // ======================================================================

      this.$emit('update:currentPage', gotoPage);
    },

    paginationClass(page) {
      return {
        'page-item': true,
        active: this.currentPage === page,
      };
    },
  },
};

/*
eslint
  vuejs-accessibility/click-events-have-key-events: 0
*/
</script>
