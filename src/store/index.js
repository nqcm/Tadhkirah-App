import { createStore } from 'vuex';

import recordsModule from './modules/records/index.js';
import authModule from './modules/auth/index.js';

const store = createStore({
  modules: {
    records: recordsModule,
    auth: authModule
  }
});

export default store;
