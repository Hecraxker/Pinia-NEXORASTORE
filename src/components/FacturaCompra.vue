<script setup>
import { formatoCOP } from '../utils/formato'
import { valorConDescuento } from '../utils/calculos'

defineProps({
  nombreTienda: { type: String, required: true },
  items: { type: Array, required: true },
  numeroFactura: { type: String, required: true },
  fecha: { type: String, required: true },
  // Totales calculados en App.vue: coinciden con los del carrito
  resumen: { type: Object, required: true }
})

const emit = defineEmits(['nueva-compra'])

const imprimir = () => window.print()
</script>

<template>
  <section class="factura" aria-labelledby="titulo-factura">
    <header class="factura__cabecera">
      <div>
        <p class="factura__tienda">{{ nombreTienda }}</p>
        <h2 id="titulo-factura">Factura de compra</h2>
      </div>
      <div class="factura__datos">
        <span><b>N.º</b> {{ numeroFactura }}</span>
        <span><b>Fecha</b> {{ fecha }}</span>
      </div>
    </header>

    <p class="factura__exito">¡Compra realizada con éxito! Gracias por elegir {{ nombreTienda }}.</p>

    <div class="factura__tabla-contenedor">
      <table class="factura__tabla">
        <thead>
          <tr>
            <th>Producto</th>
            <th class="num">Cant.</th>
            <th class="num">Valor unitario</th>
            <th class="num">Descuento</th>
            <th class="num">Valor con descuento</th>
            <th class="num">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.producto.id">
            <td data-etiqueta="Producto">
              <strong>{{ item.producto.nombre }}</strong>
              <small>{{ item.producto.descripcion }}</small>
            </td>
            <td class="num" data-etiqueta="Cantidad">{{ item.cantidad }}</td>
            <td class="num" data-etiqueta="Valor unitario">{{ formatoCOP(item.producto.valor) }}</td>
            <td class="num" data-etiqueta="Descuento">{{ item.producto.descuento }} %</td>
            <td class="num" data-etiqueta="Valor con descuento">{{ formatoCOP(valorConDescuento(item.producto)) }}</td>
            <td class="num" data-etiqueta="Subtotal">{{ formatoCOP(valorConDescuento(item.producto) * item.cantidad) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <dl class="factura__totales">
      <div><dt>Total de descuentos</dt><dd>-{{ formatoCOP(resumen.totalDescuentos) }}</dd></div>
      <div><dt>Subtotal después de descuentos</dt><dd>{{ formatoCOP(resumen.subtotalConDescuento) }}</dd></div>
      <div><dt>IVA (19 %)</dt><dd>{{ formatoCOP(resumen.iva) }}</dd></div>
      <div class="factura__total"><dt>Total a pagar</dt><dd>{{ formatoCOP(resumen.totalPagar) }}</dd></div>
    </dl>

    <div class="factura__acciones">
      <button class="boton boton--secundario" type="button" @click="imprimir">Imprimir factura</button>
      <button class="boton" type="button" @click="emit('nueva-compra')">Nueva compra</button>
    </div>
  </section>
</template>

<style scoped>
.factura { max-width: 900px; margin: 0 auto; background: var(--blanco); border-radius: var(--radio); box-shadow: var(--sombra); padding: 2rem; animation: aparecer 0.35s ease; }
.factura__cabecera { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; border-bottom: 2px solid var(--oscuro); padding-bottom: 1rem; }
.factura__tienda { margin: 0; font-weight: 800; letter-spacing: 0.14em; color: var(--acento); }
.factura__cabecera h2 { margin: 0.1rem 0 0; font-size: 1.7rem; }
.factura__datos { display: flex; flex-direction: column; gap: 0.2rem; text-align: right; font-size: 0.95rem; }
.factura__datos b { color: var(--gris-texto); margin-right: 0.4rem; font-weight: 600; }
.factura__exito { background: #eff6ff; color: var(--acento-oscuro); padding: 0.75rem 1rem; border-radius: 12px; font-weight: 600; }
.factura__tabla-contenedor { overflow-x: auto; }
.factura__tabla { width: 100%; border-collapse: collapse; font-size: 0.92rem; }
.factura__tabla th { text-align: left; background: var(--fondo); padding: 0.7rem; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.04em; color: var(--gris-texto); }
.factura__tabla td { padding: 0.8rem 0.7rem; border-bottom: 1px solid var(--gris); vertical-align: top; }
.factura__tabla td small { display: block; color: var(--gris-texto); margin-top: 0.15rem; }
.num { text-align: right !important; white-space: nowrap; }
.factura__totales { margin: 1.25rem 0 0 auto; max-width: 380px; display: flex; flex-direction: column; gap: 0.5rem; }
.factura__totales div { display: flex; justify-content: space-between; gap: 1rem; }
.factura__totales dt { color: var(--gris-texto); }
.factura__totales dd { margin: 0; font-weight: 600; }
.factura__total { border-top: 2px solid var(--oscuro); padding-top: 0.7rem; font-size: 1.3rem; }
.factura__total dt { color: var(--oscuro) !important; font-weight: 700; }
.factura__total dd { font-weight: 800 !important; color: var(--acento-oscuro); }
.factura__acciones { display: flex; justify-content: flex-end; flex-wrap: wrap; gap: 0.75rem; margin-top: 1.75rem; }
@keyframes aparecer { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }

@media (max-width: 640px) {
  .factura { padding: 1.1rem; }
  .factura__datos { text-align: left; }
  .factura__tabla thead { display: none; }
  .factura__tabla, .factura__tabla tbody, .factura__tabla tr, .factura__tabla td { display: block; width: 100%; }
  .factura__tabla tr { border: 1px solid var(--gris); border-radius: 12px; margin-bottom: 0.8rem; padding: 0.4rem 0.2rem; }
  .factura__tabla td { border: 0; padding: 0.35rem 0.7rem; display: flex; justify-content: space-between; gap: 1rem; text-align: right; }
  .factura__tabla td::before { content: attr(data-etiqueta); color: var(--gris-texto); font-weight: 600; text-align: left; }
  .factura__tabla td:first-child { display: block; text-align: left; }
  .factura__tabla td:first-child::before { display: none; }
  .factura__totales { max-width: none; }
  .factura__acciones .boton { flex: 1; }
}

@media print {
  .factura { box-shadow: none; padding: 0; }
  .factura__acciones { display: none; }
}
</style>
