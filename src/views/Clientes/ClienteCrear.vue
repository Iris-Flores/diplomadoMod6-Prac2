<template>
  <div>
    <h5>Nuevo Cliente</h5>
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
        <input type="email" class="form-control" v-model="form.email" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Teléfono</label>
        <input
          type="tel"
          class="form-control"
          v-model="form.telefono"
          required
          pattern="[0-9]{7,15}"
          title="Ingrese un número válido, solo dígitos entre 7 y 15 caracteres"
        />
      </div>
      <button type="submit" class="btn btn-primary">Guardar</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "ClienteCrear",
  data() {
    return {
      form: {
        nombre: "",
        email: "",
        telefono: "",
      },
    };
  },
  methods: {
    guardar() {
      if (!this.$refs.form.checkValidity()) {
        this.$refs.form.reportValidity();
        return;
      }
      this.$emit("created", { ...this.form });
      this.form.nombre = "";
      this.form.email = "";
      this.form.telefono = "";
    },
  },
};
</script>
