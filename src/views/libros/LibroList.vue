<template>
  <h1>{{ title }}</h1>
  <button type="button" class="btn btn-outline-primary" @click="abrirModalParaCrear()">Agregar</button>
  <br /><br />

  <div class="mb-3">
    <div class="input-group mb-2">
      <span class="input-group-text">Buscar por título</span>
      <input
        type="search"
        v-model="textoAbuscar"
        class="form-control"
        @change="obtenerLista"
        placeholder="Escribe el título"
      />
    </div>

    <div class="input-group">
      <label class="input-group-text" for="selectAutor">Filtrar por autor</label>
      <select
        id="selectAutor"
        v-model="autorSeleccionado"
        class="form-select"
        @change="obtenerLista"
      >
        <option value="">-- Todos --</option>
        <option v-for="autor in autores" :key="autor" :value="autor">{{ autor }}</option>
      </select>
    </div>

    <button class="btn btn-secondary mt-2" @click="limpiarFiltros">Limpiar filtros</button>
  </div>

  <div class="table-responsive">
    <table class="table table-bordered border-secondary">
      <thead class="table-primary">
        <tr>
          <th>ID</th>
          <th>Título</th>
          <th>Autor</th>
          <th>Precio</th>
          <th>Stock</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in items" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.titulo }}</td>
          <td>{{ item.autor }}</td>
          <td>{{ item.precio }}</td>
          <td>{{ item.stock }}</td>
          <td>
            <button type="button" class="btn btn-outline-primary" @click="abrirModalParaEditar(item)">
              <i class="bi bi-pen-fill"></i>
            </button>
            &nbsp;
            <button type="button" class="btn btn-outline-danger" @click="eliminar(item)">
              <i class="bi bi-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="modal fade" id="modalLibroEditar" tabindex="-1" aria-labelledby="modalLibroEditarLabel" aria-hidden="true" ref="modalRef">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
        </div>
        <div class="modal-body">
          <LibroCrear v-if="modalMode === 'crear'" @created="nuevo($event)" />
          <LibroEditar v-if="modalMode === 'editar'" :item="itemSeleccionado" @updated="modificar($event)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as bootstrap from 'bootstrap';
import LibroCrear from './LibroCrear.vue';
import LibroEditar from './LibroEditar.vue';

export default {
  name: 'LibrosList',
  data() {
    return {
      title: 'Libros',
      items: [],
      autores: [],
      textoAbuscar: '',
      autorSeleccionado: '',
      modalBootstrapInstance: null,
      modalMode: 'crear',
      itemSeleccionado: null,
    };
  },
  components: {
    LibroCrear,
    LibroEditar
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$refs.modalRef) {
        this.modalBootstrapInstance = new bootstrap.Modal(this.$refs.modalRef);
      }
    });
    this.obtenerLista();
    this.obtenerAutores();
  },
  methods: {
    obtenerLista() {
      let url = `${process.env.VUE_APP_API_URL}/libros?`;

      if (this.textoAbuscar) {
        url += `titulo_like=${encodeURIComponent(this.textoAbuscar)}&`;
      }
      if (this.autorSeleccionado) {
        url += `autor=${encodeURIComponent(this.autorSeleccionado)}&`;
      }

      this.axios.get(url)
        .then((response) => {
          this.items = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    obtenerAutores() {
      this.axios.get(`${process.env.VUE_APP_API_URL}/libros`)
        .then(response => {
          const autoresUnicos = new Set(response.data.map(libro => libro.autor));
          this.autores = Array.from(autoresUnicos);
        })
        .catch(error => {
          console.error(error);
        });
    },
    abrirModalParaCrear() {
      this.modalMode = 'crear';
      if (this.modalBootstrapInstance) {
        this.modalBootstrapInstance.show();
      }
    },
    cerrarModal() {
      if (this.modalBootstrapInstance) {
        this.modalBootstrapInstance.hide();
      }
    },
    nuevo(value) {
      this.axios.post(`${process.env.VUE_APP_API_URL}/libros`, value)
        .then(() => {
          this.cerrarModal();
          this.obtenerLista();
          this.obtenerAutores(); // refresca autores por si hay nuevo
        })
        .catch((error) => {
          console.error(error);
        });
    },
    abrirModalParaEditar(item) {
      this.itemSeleccionado = { ...item };
      this.modalMode = 'none';
      setTimeout(() => {
        if (this.modalBootstrapInstance) {
          this.modalBootstrapInstance.show();
          this.modalMode = 'editar';
        }
      });
    },
    modificar(value) {
      this.axios.patch(`${process.env.VUE_APP_API_URL}/libros/${value.id}`, value)
        .then(() => {
          this.cerrarModal();
          this.obtenerLista();
          this.obtenerAutores();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    eliminar(value) {
      if (confirm('¿Está seguro de eliminar este libro?')) {
        this.axios.delete(`${process.env.VUE_APP_API_URL}/libros/${value.id}`)
          .then(() => {
            this.obtenerLista();
            this.obtenerAutores();
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    limpiarFiltros() {
      this.textoAbuscar = '';
      this.autorSeleccionado = '';
      this.obtenerLista();
    }
  }
};
</script>
