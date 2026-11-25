<script setup>
// Componente de presentación: no emite eventos ni guarda estado
defineProps({
  nombreTienda: { type: String, required: true },
  anio: { type: Number, required: true },
  contacto: { type: String, required: true }
})
</script>

<template>
  <footer class="pie">
    <div class="pie__contenido">
      <strong class="pie__nombre">{{ nombreTienda }}</strong>
      <span>{{ contacto }}</span>
      <small>© {{ anio }} {{ nombreTienda }}. Todos los derechos reservados.</small>
    </div>
  </footer>
</template>

<style scoped>
.pie { background: var(--oscuro); color: #cbd5e1; margin-top: 3rem; }
.pie__contenido { max-width: 1200px; margin: 0 auto; padding: 2rem 1.25rem; display: flex; flex-direction: column; align-items: center; gap: 0.35rem; text-align: center; }
.pie__nombre { color: #fff; letter-spacing: 0.14em; }
.pie small { color: #94a3b8; }
</style>
