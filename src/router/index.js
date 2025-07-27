import { createRouter, createWebHistory } from 'vue-router'
import LibrosList from '@/views/libros/LibroList.vue'
import LibrosCrear from '@/views/libros/LibroCrear.vue'
import LibrosEditar from '@/views/libros/LibroEditar.vue'

import ClienteList from '@/views/Clientes/ClienteList.vue'
import ClienteCrear from '@/views/Clientes/ClienteCrear.vue'
import ClienteEditar from '@/views/Clientes/ClienteEditar.vue'

import VentaList from '@/views/Ventas/VentaList.vue'
import VentaCrear from '@/views/Ventas/VentaCrear.vue'
import VentaEditar from '@/views/Ventas/VentaEditar.vue'

import HomePage from '@/views/HomePage.vue'

const routes = [
  //{ path: '/', redirect: '/libros' },
  { 
    path: '/', 
    component: HomePage, 
    meta: { hideHeader: true },
  },
  { path: '/libros', component: LibrosList },
  { path: '/libros/crear', component: LibrosCrear },
  { path: '/libros/editar/:id', component: LibrosEditar, props: true },

  { path: '/clientes', component: ClienteList },
  { path: '/clientes/crear', component: ClienteCrear },
  { path: '/clientes/editar/:id', component: ClienteEditar, props: true },

  { path: '/ventas', component: VentaList },
  { path: '/ventas/crear', component: VentaCrear },
  { path: '/ventas/editar/:id', component: VentaEditar, props: true },
 
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
