<template>
  <div>
    <h5>Ventas</h5>
    <button class="btn btn-outline-primary" @click="abrirModalCrear">Nueva Venta</button>
    <br><br>
    <table class="table table-bordered">
      <thead class="table-primary">
        <tr>
          <th>ID</th>
          <th>Cliente</th>
          <th>Fecha</th>
          <th>Total</th>
          <th>Detalle</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="venta in ventas" :key="venta.id">
          <td>{{ venta.id }}</td>
          <td>{{ obtenerNombreCliente(venta.clienteId) }}</td>
          <td>{{ venta.fecha }}</td>
          <td>{{ calcularTotal(venta.detalle) }}</td>
          <td>
            <div v-for="(item, index) in venta.detalle" :key="index">
              {{ obtenerTituloLibro(item.libroId) }} - Cant: {{ item.cantidad }} - Precio U: Bs {{ item.precioUnitario }}
            </div>
          </td>
          <td>
            <button class="btn btn-sm btn-primary" @click="abrirModalEditar(venta)">
              <i class="bi bi-pen-fill"></i>
            </button>
            <button class="btn btn-sm btn-danger ms-2" @click="eliminarVenta(venta.id)">
              <i class="bi bi-trash-fill"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal Editar -->
    <div class="modal fade" id="modalEditar" tabindex="-1" ref="modalEditar">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Editar Venta</h5>
            <button type="button" class="btn-close" @click="cerrarModalEditar"></button>
          </div>
          <div class="modal-body">
            <VentaEditar
              v-if="ventaSeleccionada"
              :item="ventaSeleccionada"
              :clientes="clientes"
              :libros="libros"
              @updated="guardarCambios"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Crear -->
    <div class="modal fade" id="modalCrear" tabindex="-1" ref="modalCrear">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Nueva Venta</h5>
            <button type="button" class="btn-close" @click="cerrarModalCrear"></button>
          </div>
          <div class="modal-body">
            <VentaCrear
              :clientes="clientes"
              :libros="libros"
              @created="crearVenta"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import VentaEditar from "./VentaEditar.vue";
import VentaCrear from "./VentaCrear.vue";
import { Modal } from "bootstrap";

export default {
  components: { VentaEditar, VentaCrear },
  data() {
    return {
      ventas: [],
      clientes: [],
      libros: [],
      ventaSeleccionada: null,
      modalEditarInstance: null,
      modalCrearInstance: null,
      apiUrl: process.env.VUE_APP_API_URL,
    };
  },
  mounted() {
    this.cargarDatos();
  },
  methods: {
    cargarDatos() {
      axios.get(`${this.apiUrl}/ventas`).then((res) => (this.ventas = res.data));
      axios.get(`${this.apiUrl}/clientes`).then((res) => (this.clientes = res.data));
      axios.get(`${this.apiUrl}/libros`).then((res) => (this.libros = res.data));
    },
    obtenerNombreCliente(id) {
      const cliente = this.clientes.find((c) => c.id === id);
      return cliente ? cliente.nombre : "Desconocido";
    },
    obtenerTituloLibro(id) {
      const libro = this.libros.find((l) => l.id === id);
      return libro ? libro.titulo : "Libro no encontrado";
    },
    calcularTotal(detalle) {
      return detalle.reduce((total, item) => total + item.cantidad * item.precioUnitario, 0).toFixed(2);
    },
    abrirModalEditar(venta) {
      this.ventaSeleccionada = {
        ...venta,
        detalle: venta.detalle.map(d => ({ ...d })),
      };
      this.$nextTick(() => {
        this.modalEditarInstance = new Modal(this.$refs.modalEditar);
        this.modalEditarInstance.show();
      });
    },
    cerrarModalEditar() {
      if (this.modalEditarInstance) this.modalEditarInstance.hide();
    },
    guardarCambios(ventaActualizada) {
      axios
        .put(`${this.apiUrl}/ventas/${ventaActualizada.id}`, ventaActualizada)
        .then(() => {
          this.cargarDatos();
          this.cerrarModalEditar();
        })
        .catch(() => alert("Error al guardar los cambios."));
    },
    eliminarVenta(id) {
      if (!confirm("¿Está seguro que desea eliminar esta venta?")) return;

      axios.delete(`${this.apiUrl}/ventas/${id}`)
        .then(() => {
          alert("Venta eliminada correctamente");
          this.cargarDatos();
          if (this.ventaSeleccionada && this.ventaSeleccionada.id === id) {
            this.cerrarModalEditar();
          }
        })
        .catch(() => alert("Error al eliminar la venta"));
    },
    abrirModalCrear() {
      this.$nextTick(() => {
        this.modalCrearInstance = new Modal(this.$refs.modalCrear);
        this.modalCrearInstance.show();
      });
    },
    cerrarModalCrear() {
      if (this.modalCrearInstance) this.modalCrearInstance.hide();
    },
    crearVenta(nuevaVenta) {
      axios.post(`${this.apiUrl}/ventas`, nuevaVenta)
        .then(() => {
          this.cargarDatos();
          this.cerrarModalCrear();
        })
        .catch(() => alert("Error al crear venta."));
    },
  },
};
</script>
