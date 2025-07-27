<template>
  <div class="d-flex flex-column min-vh-100">

    <header v-if="!ocultarHeader" class="bg-white shadow-sm">
      <nav class="navbar navbar-expand-lg navbar-light container">
        <router-link class="navbar-brand fw-bold" to="/">Mi Biblioteca</router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/libros">Libros</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/clientes">Clientes</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/ventas">Ventas</router-link>
            </li>
          </ul>
        </div>
      </nav>
    </header>

    <main class="container flex-fill my-4">
      <div v-if="loading" class="text-center my-4">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Cargando...</span>
        </div>
      </div>
      <transition name="fade" mode="out-in">
        <router-view v-if="!loading" />
      </transition>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const loading = ref(false)
const router = useRouter()
const route = useRoute()

const ocultarHeader = computed(() => route.path === '/')

router.beforeEach(() => {
  loading.value = true
})

router.afterEach(() => {
  setTimeout(() => loading.value = false, 400)
})
</script>

<style>
html, body, #app {
  height: 100%;
  margin: 0;
}

.container {
  max-width: 960px;
}

.router-link-active {
  font-weight: bold;
  color: #1c21b1 !important;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
