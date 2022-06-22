import Vue from 'vue';
import Vuex, {createLogger} from 'vuex';
import modules from './modules';

Vue.use(Vuex);

const debug = process.env.NODE_ENV === 'development';

export default new Vuex.Store({
  modules,
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});
