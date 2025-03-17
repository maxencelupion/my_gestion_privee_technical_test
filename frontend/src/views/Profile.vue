<template>
  <div class="container mt-4">
    <h2>Profile</h2>
    <div v-if="isLoading">
      <p>Loading...</p>
    </div>
    <div v-else-if="user">
      <p><strong>ID:</strong> {{ user.id }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Password:</strong> {{ user.password }}</p>
    </div>
    <div v-else>
      <p>Erreur lors du chargement du profil.</p>
    </div>
  </div>
</template>

<script setup>
import { AuthStore } from '@/stores/Auth'
import { onMounted, ref } from 'vue'

const authStore = AuthStore();
const user = ref(null);
const isLoading = ref(true);

async function fetchUser() {
  user.value = await authStore.profile()
  isLoading.value = false
}

onMounted(fetchUser);
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
}
</style>
