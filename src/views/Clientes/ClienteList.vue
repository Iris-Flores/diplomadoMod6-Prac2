<template>
  <h1>Clientes</h1>
  <button class="btn btn-outline-primary" @click="abrirModalParaCrear()">Agregar</button>
  <br><br>

  <div class="table-responsive">
    <table class="table table-bordered border-secondary">
      <thead class="table-primary">
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Email</th>
          <th>Teléfono</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cliente in items" :key="cliente.id">
          <td>{{ cliente.id }}</td>
          <td>{{ cliente.nombre }}</td>
          <td>{{ cliente.email }}</td>
          <td>{{ cliente.telefono }}</td>
          <td>
            <button class="btn btn-outline-primary" @click="abrirModalParaEditar(cliente)">
              <i class="bi bi-pen-fill"></i>
            </button>
            <button class="btn btn-outline-danger" @click="eliminar(cliente)">
              <i class="bi bi-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="modal fade" ref="modalRef" id="modalCliente" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <ClienteCrear v-if="modalMode === 'crear'" @created="nuevo($event)" />
          <ClienteEditar v-if="modalMode === 'editar'" :item="itemSeleccionado" @updated="modificar($event)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClienteCrear from './ClienteCrear.vue';
import ClienteEditar from './ClienteEditar.vue';
import { Modal } from 'bootstrap';

export default {
  components: { ClienteCrear, ClienteEditar },
  data() {
    return {
      items: [],
      modalBootstrapInstance: null,
      modalMode: 'crear',
      itemSeleccionado: null,
    };
  },
  mounted() {
    this.modalBootstrapInstance = new Modal(this.$refs.modalRef);
    this.obtenerLista();
  },
  methods: {
    obtenerLista() {
      this.axios.get(process.env.VUE_APP_API_URL + '/clientes')
        .then(res => this.items = res.data)
        .catch(err => console.error(err));
    },
    abrirModalParaCrear() {
      this.modalMode = 'crear';
      this.modalBootstrapInstance.show();
    },
    abrirModalParaEditar(item) {
      this.itemSeleccionado = { ...item };
      this.modalMode = 'editar';
      this.modalBootstrapInstance.show();
    },
    cerrarModal() {
      this.modalBootstrapInstance.hide();
    },
    nuevo(value) {
      this.axios.post(process.env.VUE_APP_API_URL + '/clientes', value)
        .then(() => { this.cerrarModal(); this.obtenerLista(); });
    },
    modificar(value) {
      this.axios.patch(process.env.VUE_APP_API_URL + '/clientes/' + value.id, value)
        .then(() => { this.cerrarModal(); this.obtenerLista(); });
    },
    eliminar(value) {
      if (confirm("¿Eliminar cliente?")) {
        this.axios.delete(process.env.VUE_APP_API_URL + '/clientes/' + value.id)
          .then(() => this.obtenerLista());
      }
    }
  }
};
</script>

