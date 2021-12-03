import { createStore } from 'vuex';

import recordsModule from './modules/records/index.js';

const store = createStore({
  modules: {
    records: recordsModule
  },
  state() {
    return {
      userId: 'n1'
    };
  },
  getters: {
    userId(state) {
      return state.userId;
    }
  }
});

export default store;
