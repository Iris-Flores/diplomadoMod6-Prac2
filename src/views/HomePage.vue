<template>
  <div class="home-page py-5">
    <div class="text-center mb-5">
      <h1 class="display-4 fw-bold text-primary">Bienvenido al panel del Administrador</h1>
      
      <router-link to="/libros" class="btn btn-outline-primary btn-lg mt-3">
        Explorar Libros
      </router-link>
    </div>

    <div class="row g-4">
      <div class="col-md-4 " v-for="item in items" :key="item.titulo">
        <div class="card h-100 shadow-sm">
          <div class="card-body text-center">
            <div class="mb-3 fs-1 text-primary">
              <i :class="item.icono"></i>
            </div>
            <h5 class="card-title">{{ item.titulo }}</h5>
            <p class="card-text">{{ item.descripcion }}</p>
            <router-link :to="item.ruta" class="btn btn-sm btn-primary">Ir</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const items = [
  {
    titulo: 'Libros',
    descripcion: 'Consulta y administra los libros disponibles.',
    ruta: '/libros',
    icono: 'bi bi-book',
  },
  {
    titulo: 'clientes',
    descripcion: 'Conoce a nuestros clientes.',
    ruta: '/clientes',
    icono: 'bi bi-person',
  },
  {
    titulo: 'Ventas',
    descripcion: 'Administra las ventas.',
    ruta: '/ventas',
    icono: 'bi bi-tags',
  },
]
</script>

<style scoped>
.home-page {
  background-color: #f8f9fa;
  border-radius: 1rem;
  padding: 2rem;
}

.card-title {
  font-weight: 600;
}

.card-text {
  font-size: 0.95rem;
  color: #89aecf;
}
</style>
