import { createRouter, createWebHistory } from 'vue-router'
import { getUserState } from './plugins/firebase'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('./pages/Home.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('./pages/auth/LoginPage.vue'),
      meta: { requiresUnAuth: true }
    },
    {
      path: '/:notFound(.*)',
      redirect: '/'
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiresUnAuth = to.matched.some(record => record.meta.requiresUnAuth)
  const isAuth = await getUserState

  if (requiresAuth && !isAuth) next('/login')
  else if (requiresUnAuth && isAuth) next('/')
  else next()
})

export default router
