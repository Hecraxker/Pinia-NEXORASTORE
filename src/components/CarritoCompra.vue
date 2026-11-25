<script setup>
import { formatoCOP } from '../utils/formato'
import { valorConDescuento } from '../utils/calculos'
import imagenAlternativa from '../assets/images/placeholder.svg'

defineProps({
  items: { type: Array, required: true },
  // Totales calculados con computed en App.vue (misma fuente que la factura)
  resumen: { type: Object, required: true }
})

const emit = defineEmits(['incrementar', 'decrementar', 'eliminar', 'finalizar-compra'])

const usarAlternativa = (evento) => {
  evento.target.src = imagenAlternativa
}
</script>

<template>
  <section class="carrito" aria-labelledby="titulo-carrito">
    <h2 id="titulo-carrito" class="carrito__titulo">Tu carrito</h2>

    <div v-if="items.length === 0" class="carrito__vacio">
      <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="9" cy="20" r="1.5" /><circle cx="18" cy="20" r="1.5" />
        <path d="M2 3h3l2.6 11.2a2 2 0 0 0 2 1.5h7.6a2 2 0 0 0 1.9-1.4L21 7H6" />
      </svg>
      <p>Aún no hay productos en el carrito.</p>
      <small>Agrega artículos desde el catálogo.</small>
    </div>

    <ul v-else class="carrito__lista">
      <li v-for="item in items" :key="item.producto.id" class="linea">
        <img class="linea__imagen" :src="item.producto.imagen" :alt="item.producto.nombre" @error="usarAlternativa" />

        <div class="linea__info">
          <strong class="linea__nombre">{{ item.producto.nombre }}</strong>
          <span class="linea__descripcion">{{ item.producto.descripcion }}</span>
          <span class="linea__precio">
            <s v-if="item.producto.descuento > 0">{{ formatoCOP(item.producto.valor) }}</s>
            {{ formatoCOP(valorConDescuento(item.producto)) }}
            <em v-if="item.producto.descuento > 0">-{{ item.producto.descuento }}%</em>
          </span>

          <div class="linea__acciones">
            <div class="cantidad" role="group" :aria-label="`Cantidad de ${item.producto.nombre}`">
              <button type="button" aria-label="Disminuir cantidad" @click="emit('decrementar', item.producto.id)">−</button>
              <span>{{ item.cantidad }}</span>
              <button type="button" aria-label="Aumentar cantidad" @click="emit('incrementar', item.producto.id)">+</button>
            </div>
            <strong class="linea__subtotal">{{ formatoCOP(valorConDescuento(item.producto) * item.cantidad) }}</strong>
            <button class="linea__eliminar" type="button" @click="emit('eliminar', item.producto.id)" :aria-label="`Eliminar ${item.producto.nombre}`">Eliminar</button>
          </div>
        </div>
      </li>
    </ul>

    <dl class="resumen">
      <div><dt>Subtotal sin descuento</dt><dd>{{ formatoCOP(resumen.subtotalRegular) }}</dd></div>
      <div class="resumen__descuento"><dt>Total descuentos</dt><dd>-{{ formatoCOP(resumen.totalDescuentos) }}</dd></div>
      <div><dt>Subtotal con descuento</dt><dd>{{ formatoCOP(resumen.subtotalConDescuento) }}</dd></div>
      <div><dt>IVA (19 %)</dt><dd>{{ formatoCOP(resumen.iva) }}</dd></div>
      <div><dt>Total de productos</dt><dd>{{ resumen.totalUnidades }}</dd></div>
      <div class="resumen__total"><dt>Total a pagar</dt><dd>{{ formatoCOP(resumen.totalPagar) }}</dd></div>
    </dl>

    <button class="boton carrito__finalizar" type="button" :disabled="items.length === 0" @click="emit('finalizar-compra')">
      Finalizar compra
    </button>
  </section>
</template>

<style scoped>
.carrito { background: var(--blanco); border-radius: var(--radio); box-shadow: var(--sombra); padding: 1.25rem; }
.carrito__titulo { margin: 0 0 1rem; font-size: 1.3rem; }
.carrito__vacio { text-align: center; color: var(--gris-texto); padding: 1.5rem 0.5rem; }
.carrito__vacio p { margin: 0.5rem 0 0.1rem; font-weight: 600; color: var(--oscuro); }
.carrito__lista { list-style: none; margin: 0 0 1rem; padding: 0; display: flex; flex-direction: column; gap: 0.9rem; max-height: 46vh; overflow-y: auto; }
.linea { display: flex; gap: 0.8rem; padding-bottom: 0.9rem; border-bottom: 1px solid var(--gris); animation: entrar 0.25s ease; }
.linea__imagen { width: 76px; height: 76px; border-radius: 12px; object-fit: cover; flex-shrink: 0; background: #eef2ff; }
.linea__info { display: flex; flex-direction: column; gap: 0.15rem; min-width: 0; flex: 1; }
.linea__nombre { font-size: 0.95rem; }
.linea__descripcion { font-size: 0.78rem; color: var(--gris-texto); display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.linea__precio { font-size: 0.88rem; font-weight: 600; }
.linea__precio s { color: var(--gris-texto); font-weight: 400; margin-right: 0.3rem; }
.linea__precio em { font-style: normal; color: var(--oferta); font-weight: 700; margin-left: 0.3rem; }
.linea__acciones { display: flex; align-items: center; flex-wrap: wrap; gap: 0.5rem 0.8rem; margin-top: 0.3rem; }
.cantidad { display: inline-flex; align-items: center; background: var(--fondo); border-radius: 10px; }
.cantidad button { width: 34px; height: 34px; border: 0; background: transparent; font-size: 1.1rem; font-weight: 700; border-radius: 10px; transition: background 0.15s; }
.cantidad button:hover { background: var(--gris); }
.cantidad span { min-width: 28px; text-align: center; font-weight: 700; }
.linea__subtotal { margin-left: auto; }
.linea__eliminar { border: 0; background: none; color: #dc2626; font-weight: 600; font-size: 0.82rem; padding: 0.3rem; }
.linea__eliminar:hover { text-decoration: underline; }
.resumen { margin: 0 0 1rem; display: flex; flex-direction: column; gap: 0.45rem; font-size: 0.92rem; }
.resumen div { display: flex; justify-content: space-between; gap: 1rem; }
.resumen dt { color: var(--gris-texto); }
.resumen dd { margin: 0; font-weight: 600; }
.resumen__descuento dd { color: var(--oferta); }
.resumen__total { border-top: 2px dashed var(--gris); padding-top: 0.7rem; font-size: 1.15rem; }
.resumen__total dt { color: var(--oscuro); font-weight: 700; }
.resumen__total dd { font-weight: 800; }
.carrito__finalizar { width: 100%; padding: 0.9rem; font-size: 1rem; }
@keyframes entrar { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
</style>
