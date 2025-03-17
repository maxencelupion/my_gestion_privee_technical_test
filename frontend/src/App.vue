<script setup>
import Navbar from '@/components/Navbar.vue'

</script>

<template>
  <header>
    <Navbar />
  </header>

  <main>
    <RouterView></RouterView>
  </main>
  <footer>
    Technical test for My Gestion Privée - Maxence LUPION
  </footer>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    text-align: center;
  }
}
</style>
