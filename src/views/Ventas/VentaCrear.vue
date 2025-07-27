<template>
  <div>
    <form @submit.prevent="guardar">
      <div class="mb-3">
        <label class="form-label">Cliente</label>
        <select v-model.number="form.clienteId" class="form-select" required>
          <option disabled value="">-- Selecciona un cliente --</option>
          <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">
            {{ cliente.nombre }}
          </option>
        </select>
      </div>

      <div class="mb-3">
        <label class="form-label">Fecha</label>
        <input type="date" v-model="form.fecha" class="form-control" required />
      </div>

      <h6>Detalle</h6>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Libro</th>
            <th>Cantidad</th>
            <th>Precio Unitario (Bs)</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in form.detalle" :key="index">
            <td>
              <select v-model.number="item.libroId" class="form-select" required @change="actualizarPrecio(index)">
                <option disabled value="">-- Selecciona un libro --</option>
                <option v-for="libro in libros" :key="libro.id" :value="libro.id">
                  {{ libro.titulo }}
                </option>
              </select>
            </td>
            <td>
              <input
                type="number"
                v-model.number="item.cantidad"
                min="1"
                class="form-control"
                required
                @input="actualizarTotal()"
              />
            </td>
            <td>
              <input
                type="number"
                v-model.number="item.precioUnitario"
                min="0"
                class="form-control"
                required
                @input="actualizarTotal()"
              />
            </td>
            <td>
              <button
                type="button"
                class="btn btn-danger btn-sm"
                @click="eliminarDetalle(index)"
                title="Eliminar detalle"
              >
                &times;
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <button type="button" class="btn btn-secondary mb-3" @click="agregarDetalle">
        + Agregar Libro
      </button>

      <div>
        <strong>Total: Bs {{ total }}</strong>
      </div>

      <button type="submit" class="btn btn-primary mt-3">Guardar Venta</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "VentaCrear",
  props: {
    clientes: {
      type: Array,
      required: true,
    },
    libros: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      form: {
        clienteId: "",
        fecha: "",
        detalle: [
          {
            libroId: "",
            cantidad: 1,
            precioUnitario: 0,
          },
        ],
      },
    };
  },
  computed: {
    total() {
      return this.form.detalle.reduce(
        (sum, item) => sum + item.cantidad * item.precioUnitario,
        0
      );
    },
  },
  methods: {
    agregarDetalle() {
      this.form.detalle.push({
        libroId: "",
        cantidad: 1,
        precioUnitario: 0,
      });
    },
    eliminarDetalle(index) {
      this.form.detalle.splice(index, 1);
      this.actualizarTotal();
    },
    actualizarPrecio(index) {
      const libroSeleccionado = this.libros.find(
        (l) => l.id === this.form.detalle[index].libroId
      );
      if (libroSeleccionado) {
        this.form.detalle[index].precioUnitario = libroSeleccionado.precio;
        this.actualizarTotal();
      }
    },
    actualizarTotal() {
      console.log("Total actualizado:", this.total);
    },
    guardar() {
       if (
        !this.form.clienteId ||
        !this.form.fecha ||
        this.form.detalle.length === 0 ||
        this.form.detalle.some(
          (item) =>
            !item.libroId || item.cantidad < 1 || item.precioUnitario < 0
        )
      ) {
        alert("Por favor complete todos los campos correctamente.");
        return;
      }
      
      this.$emit("created", { ...this.form, total: this.total });
      this.form.clienteId = "";
      this.form.fecha = "";
      this.form.detalle = [
        {
          libroId: "",
          cantidad: 1,
          precioUnitario: 0,
        },
      ];
    },
  },
};
</script>
