import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Auth from '@/views/Auth.vue'
import Profile from '@/views/Profile.vue'
import { AuthStore } from '@/stores/Auth'

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Auth },
  { path: '/profile', component: Profile, meta: { requiresAuth: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  const authStore = AuthStore();

  if (authStore.isAuthenticated === null) {
    await authStore.check();
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next({ path: '/login' });
  }

  next();
});


export default router
