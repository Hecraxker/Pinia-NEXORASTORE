<script setup>
import { computed, ref } from 'vue'
import { formatoCOP } from '../utils/formato'
import { valorConDescuento } from '../utils/calculos'
import imagenAlternativa from '../assets/images/placeholder.svg'

const props = defineProps({
  producto: { type: Object, required: true }
})

const emit = defineEmits(['agregar-al-carrito'])

const tieneDescuento = computed(() => props.producto.descuento > 0)
// valorConDescuento = valor × (1 - descuento / 100), con Math.round
const precioFinal = computed(() => valorConDescuento(props.producto))

// Estado local solo de presentación: si la imagen falla se usa una alternativa
const imagenFallida = ref(false)

const comprar = () => emit('agregar-al-carrito', props.producto)
</script>

<template>
  <article class="tarjeta">
    <div class="tarjeta__imagen">
      <span v-if="tieneDescuento" class="tarjeta__etiqueta">-{{ producto.descuento }}%</span>
      <img
        :src="imagenFallida ? imagenAlternativa : producto.imagen"
        :alt="producto.nombre"
        loading="lazy"
        @error="imagenFallida = true"
      />
    </div>

    <div class="tarjeta__cuerpo">
      <h3 class="tarjeta__nombre">{{ producto.nombre }}</h3>
      <p class="tarjeta__descripcion">{{ producto.descripcion }}</p>

      <div class="tarjeta__precios">
        <span v-if="tieneDescuento" class="tarjeta__regular">{{ formatoCOP(producto.valor) }}</span>
        <span class="tarjeta__final">{{ formatoCOP(precioFinal) }}</span>
      </div>

      <button class="boton tarjeta__boton" type="button" @click="comprar">Comprar</button>
    </div>
  </article>
</template>

<style scoped>
.tarjeta {
  display: flex; flex-direction: column; height: 100%;
  background: var(--blanco); border-radius: var(--radio); overflow: hidden;
  box-shadow: var(--sombra); transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.tarjeta:hover { transform: translateY(-5px); box-shadow: var(--sombra-fuerte); }
.tarjeta__imagen { position: relative; aspect-ratio: 4 / 3; background: #eef2ff; overflow: hidden; }
.tarjeta__imagen img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.35s ease; }
.tarjeta:hover .tarjeta__imagen img { transform: scale(1.05); }
.tarjeta__etiqueta {
  position: absolute; top: 12px; left: 12px; z-index: 1;
  background: var(--oferta); color: #fff; font-weight: 800; font-size: 0.85rem;
  padding: 0.25rem 0.65rem; border-radius: 999px; box-shadow: 0 4px 10px rgba(249, 115, 22, 0.4);
}
.tarjeta__cuerpo { display: flex; flex-direction: column; gap: 0.5rem; padding: 1.1rem; flex: 1; }
.tarjeta__nombre { margin: 0; font-size: 1.05rem; }
.tarjeta__descripcion { margin: 0; color: var(--gris-texto); font-size: 0.9rem; flex: 1; }
.tarjeta__precios { display: flex; flex-direction: column; min-height: 3.2rem; justify-content: flex-end; }
.tarjeta__regular { color: var(--gris-texto); text-decoration: line-through; font-size: 0.88rem; }
.tarjeta__final { font-size: 1.35rem; font-weight: 800; color: var(--oscuro); }
.tarjeta__boton { width: 100%; margin-top: 0.3rem; padding: 0.8rem; }
</style>
