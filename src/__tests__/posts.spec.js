/* eslint-disable no-unused-vars */
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import {mount, createLocalVue, shallowMount} from '@vue/test-utils';

import Posts from './components/Posts.vue';
import {createRouter} from './router/router';
import {createStore} from './store/store';

describe('Posts.vue', () => {
  // Create Local Vue

  const createWrapper = (component, options = {}, storeState = {}) => {
    const localVue = createLocalVue();
    localVue.use(VueRouter);
    localVue.use(Vuex);

    // Create Store and Router
    const store = createStore(storeState);
    store.dispatch = jest.fn();

    const router = createRouter();

    return mount(component, {
      store,
      router,
      localVue,
      ...options,
    });
  };

  it('renders a message if passed', () => {
    const message = 'New content coming soon!';

    const wrapper = createWrapper(Posts, {propsData: {message}});

    console.log(wrapper.html());

    expect(wrapper.find('[data-testid="message"]').element).toHaveTextContent(
      message,
    );

    expect(wrapper.find('#message').text()).toBe(message);
  });

  it('renders posts', async () => {
    const wrapper = createWrapper(
      Posts,
      {},
      {
        posts: [{id: 1, title: 'Post'}],
      },
    );

    expect(wrapper.findAll('[data-testid="post"]').length).toBe(1);
    expect(wrapper.findAll('[data-testid="post"]').at(0).text()).toContain(
      'Post',
    );
  });

  it('Dispatch a auth/authenticated when first load component', async () => {
    const wrapper = createWrapper(Posts);
    expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith('auth/authenticated')
  })

  it('Not authenticated and not show link', async () => {
    const wrapper = createWrapper(Posts);
    expect(wrapper.find('[data-testid="new-post"]').exists()).toBe(false);
  });

  it('Authenticated and show link', async () => {
    const message = 'New Post';
    // const router = createRouter();
    // const mockStore = {
    //   getters: {
    //     authenticated: () => true,
    //   },
    //   state: {
    //     posts: [],
    //   },
    //   dispatch: jest.fn()
    // };

    // const wrapper = mount(Posts, {
    //   mocks: {
    //     $store: mockStore,
    //   },
    //   router,
    // });

    const wrapper = createWrapper(Posts, {
      computed: {
        authenticated: () => true
      }
    })

    console.log(wrapper.find('[data-testid="new-post"]').html());
    
    expect(wrapper.find('[data-testid="new-post"]').element).toHaveTextContent(
      message,
    );

  });
});
