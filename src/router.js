import { createRouter, createWebHistory } from 'vue-router';

import RecordsList from './components/records/RecordsList.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: RecordsList },
    { path: '/:notFound(.*)', redirect: '/' }
  ]
});

export default router;
