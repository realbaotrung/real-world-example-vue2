<template>
  <div>Hello from the-header-component</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'rwv-the-header',

  computed: {
    ...mapGetters({
      currentUser: 'auth/currentUser',
    })
  }
};
</script>
