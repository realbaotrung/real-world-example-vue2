import Vue from 'vue';
import Vuex, {createLogger} from 'vuex';
import modules from './modules';

Vue.use(Vuex);

const debug = process.env.NODE_ENV === 'development';

const storeOptions = {
  modules,
  strict: debug,
  plugins: debug ? [createLogger()] : [],
};

export default new Vuex.Store(storeOptions);
