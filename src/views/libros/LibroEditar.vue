<template>
  <div>
    <div class="mb-3">
      <label>Título</label>
      <input v-model="form.titulo" class="form-control" required />
    </div>

    <div class="mb-3">
      <label>Autor</label>
      <input v-model="form.autor" class="form-control" required />
    </div>

    <div class="mb-3">
      <label>Precio</label>
      <input type="number" v-model.number="form.precio" class="form-control" required />
    </div>

    <div class="mb-3">
      <label>Stock</label>
      <input type="number" v-model.number="form.stock" class="form-control" required />
    </div>

    <button class="btn btn-success" @click="editarLibro">Actualizar</button>
  </div>
</template>

<script>
export default {
  props: ['item'],
  data() {
    return {
      form: {
        id: null,
        titulo: '',
        autor: '',
        precio: 0,
        stock: 0
      }
    };
  },
  mounted() {
    this.form = { ...this.item };
  },
  methods: {
    editarLibro() {
      if (!this.form.titulo || !this.form.autor || this.form.precio <= 0 || this.form.stock < 0) {
        alert('Por favor complete todos los campos correctamente');
        return;
      }
      this.$emit('updated', { ...this.form });
    }
  }
};
</script>