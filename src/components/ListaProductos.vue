<script setup>
import ProductoCard from './ProductoCard.vue'

defineProps({
  productos: { type: Array, required: true }
})

const emit = defineEmits(['agregar-producto'])

// Reenvía hacia App.vue el evento que emite cada tarjeta
const reenviarProducto = (producto) => emit('agregar-producto', producto)
</script>

<template>
  <section class="catalogo" aria-labelledby="titulo-catalogo">
    <div class="catalogo__cabecera">
      <h2 id="titulo-catalogo">Catálogo de productos</h2>
      <p>{{ productos.length }} productos tecnológicos con envío a todo el país.</p>
    </div>

    <div class="catalogo__rejilla">
      <ProductoCard
        v-for="producto in productos"
        :key="producto.id"
        :producto="producto"
        @agregar-al-carrito="reenviarProducto"
      />
    </div>
  </section>
</template>

<style scoped>
.catalogo__cabecera h2 { margin: 0; font-size: 1.6rem; }
.catalogo__cabecera p { margin: 0.2rem 0 1.25rem; color: var(--gris-texto); }
.catalogo__rejilla { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1.25rem; }
@media (max-width: 520px) { .catalogo__rejilla { grid-template-columns: 1fr; } }
</style>
