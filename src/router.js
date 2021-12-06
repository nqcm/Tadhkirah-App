import { createRouter, createWebHistory } from 'vue-router';
import { getUserState } from './firebase';

// import RecordsList from './components/records/RecordsList.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('./components/records/RecordsList.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('./pages/auth/UserAuth.vue'),
      meta: { requiresUnAuth: true }
    },
    {
      path: '/:notFound(.*)',
      redirect: '/'
    }
  ]
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresUnAuth = to.matched.some(record => record.meta.requiresUnAuth);
  const isAuth = await getUserState();

  if (requiresAuth && !isAuth) next('/login');
  else if (requiresUnAuth && isAuth) next('/');
  else next();
});

export default router;
