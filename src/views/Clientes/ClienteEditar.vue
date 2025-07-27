<template>
  <div>
    <form ref="form" @submit.prevent="guardar">
      <div class="mb-3">
        <label class="form-label">Nombre</label>
        <input
          type="text"
          class="form-control"
          v-model="form.nombre"
          required
          minlength="2"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">Email</label>
        <input
          type="email"
          class="form-control"
          v-model="form.email"
          required
        />
      </div>
      <div class="mb-3">
        <label class="form-label">Teléfono</label>
        <input
          type="tel"
          class="form-control"
          v-model="form.telefono"
          required
          pattern="[0-9]{7,10}"
          title="Ingrese un número válido, solo dígitos entre 7 y 10 caracteres"
        />
      </div>
      <button type="submit" class="btn btn-primary">Actualizar</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "ClienteEditar",
  props: {
    item: Object
  },
  data() {
    return {
      form: {
        id: null,
        nombre: "",
        email: "",
        telefono: ""
      }
    };
  },
  watch: {
    item: {
      immediate: true,
      handler(nuevoItem) {
        if (nuevoItem) {
          this.form = { ...nuevoItem };
        }
      }
    }
  },
  methods: {
    guardar() {
      if (!this.$refs.form.checkValidity()) {
        this.$refs.form.reportValidity();
        return;
      }
      this.$emit("updated", { ...this.form });
    }
  }
};
</script>
