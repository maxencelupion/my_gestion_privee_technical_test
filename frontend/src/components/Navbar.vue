<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top w-100 shadow-sm">
    <div class="container">
      <a class="navbar-brand" href="/">Technical Test My Gestion Privée</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <a class="nav-link" href="/">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" :href="isAuth ? '/profile' : '/login'">
              {{ isAuth ? 'Profile' : 'Login' }}
            </a>
          </li>
          <li v-if="isAuth" class="nav-item">
            <button type="button" class="btn btn-outline-danger ms-2" @click.prevent="logoutClick">Log out</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { AuthStore } from '@/stores/Auth';
import router from '@/router/index.js'

const authStore = AuthStore();
const isAuth = ref(authStore.isAuthenticated);

onMounted(async () => {
  await authStore.check();
  isAuth.value = authStore.isAuthenticated;
});

watch(
  () => authStore.isAuthenticated,
  (newValue) => {
    isAuth.value = newValue;
  }
);

function logoutClick() {
  authStore.logout();
  router.push('/');
}
</script>

<style scoped>
.navbar {
  z-index: 1000;
}
</style>
