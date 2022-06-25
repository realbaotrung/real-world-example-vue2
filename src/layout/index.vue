<template>
  <div id="app">
    <RwvTheHeader />
    <router-view></router-view>
    <RwvTheFooter />
  </div>
</template>

<script>
import RwvTheHeader from './TheHeader';
import RwvTheFooter from './TheFooter';

export default {
  name: 'AppLayout',
  components: {RwvTheHeader, RwvTheFooter},
};
</script>
