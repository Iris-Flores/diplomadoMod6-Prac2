<template>
  <form @submit.prevent="guardarCambios">
    <div class="mb-3">
      <label class="form-label">Cliente</label>
      <select v-model="form.clienteId" class="form-select" required>
        <option disabled value="">Seleccione un cliente</option>
        <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">
          {{ cliente.nombre }}
        </option>
      </select>
    </div>

    <div class="mb-3">
      <label class="form-label">Fecha</label>
      <input type="date" v-model="form.fecha" class="form-control" required />
    </div>

    <div class="mb-3">
      <label class="form-label">Detalle</label>
      <div
        v-for="(detalle, index) in form.detalle"
        :key="index"
        class="border rounded p-3 mb-2"
      >
        <div class="mb-2">
          <label class="form-label">Libro</label>
          <select v-model="detalle.libroId" class="form-select" required>
            <option disabled value="">Seleccione un libro</option>
            <option v-for="libro in libros" :key="libro.id" :value="libro.id">
              {{ libro.titulo }}
            </option>
          </select>
        </div>
        <div class="mb-2">
          <label class="form-label">Cantidad</label>
          <input type="number" v-model.number="detalle.cantidad" class="form-control" min="1" required />
        </div>
        <div class="mb-2">
          <label class="form-label">Precio Unitario</label>
          <input
            type="number"
            v-model.number="detalle.precioUnitario"
            class="form-control"
            min="0"
            required
          />
        </div>
        <button type="button" class="btn btn-danger btn-sm" @click="eliminarDetalle(index)">Eliminar</button>
      </div>
      <button type="button" class="btn btn-secondary btn-sm" @click="agregarDetalle">
        Agregar libro
      </button>
    </div>

    <div class="mb-3">
      <label class="form-label">Total (Bs)</label>
      <input type="number" class="form-control" :value="calcularTotal()" disabled />
    </div>

    <button type="submit" class="btn btn-primary">Guardar cambios</button>
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: "VentaEditar",
  props: ["item"],
  data() {
    return {
      form: {
        id: null,
        clienteId: "",
        fecha: "",
        detalle: []
      },
      clientes: [],
      libros: []
    };
  },
  mounted() {
    this.cargarClientes();
    this.cargarLibros();
  },
  watch: {
    item: {
      immediate: true,
      handler(nuevoItem) {
        if (nuevoItem) {
          this.form = {
            id: nuevoItem.id,
            clienteId: nuevoItem.clienteId,
            fecha: nuevoItem.fecha,
            detalle: nuevoItem.detalle.map(d => ({ ...d })),
          };
        }
      },
    },
  },
  methods: {
    async cargarClientes() {
      try {
        const res = await axios.get(`${process.env.VUE_APP_API_URL}/clientes`);
        this.clientes = res.data;
      } catch (error) {
        console.error("Error cargando clientes:", error);
      }
    },
    async cargarLibros() {
      try {
        const res = await axios.get(`${process.env.VUE_APP_API_URL}/libros`);
        this.libros = res.data;
      } catch (error) {
        console.error("Error cargando libros:", error);
      }
    },
    agregarDetalle() {
      this.form.detalle.push({
        libroId: "",
        cantidad: 1,
        precioUnitario: 0
      });
    },
    eliminarDetalle(index) {
      this.form.detalle.splice(index, 1);
    },
    calcularTotal() {
      return this.form.detalle.reduce(
        (sum, item) => sum + item.cantidad * item.precioUnitario,
        0
      );
    },
    guardarCambios() {
      const ventaActualizada = {
        ...this.form,
        total: this.calcularTotal()
      };
      this.$emit("updated", ventaActualizada);
    }
  }
};
</script>
