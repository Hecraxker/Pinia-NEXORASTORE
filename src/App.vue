<script setup>
import { computed, ref } from 'vue'
import { useTiendaStore } from './stores/tiendaStore'
import AppHeader from './components/AppHeader.vue'
import ListaProductos from './components/ListaProductos.vue'
import CarritoCompra from './components/CarritoCompra.vue'
import FacturaCompra from './components/FacturaCompra.vue'
import AppFooter from './components/AppFooter.vue'

const tienda = useTiendaStore()
const NOMBRE_TIENDA = 'NEXORA STORE'
const CONTACTO = 'soporte@nexorastore.co · WhatsApp +57 300 000 0000'
const anioActual = new Date().getFullYear()

// Referencias al estado y getters de Pinia para utilizarlos en la plantilla.
const productos = computed(() => tienda.productos)
const carrito = computed(() => tienda.carrito)
const mostrarFactura = computed(() => tienda.mostrarFactura)
const numeroFacturaTexto = computed(() => tienda.numeroFacturaTexto)
const fechaFactura = computed(() => tienda.fechaFactura)
const resumen = computed(() => tienda.resumen)
const totalUnidades = computed(() => tienda.totalUnidades)

// Estado local de interfaz: aviso temporal y desplazamiento del carrito.
const aviso = ref('')
const seccionCarrito = ref(null)
let temporizadorAviso = null

const mostrarAviso = (texto) => {
  aviso.value = texto
  clearTimeout(temporizadorAviso)
  temporizadorAviso = setTimeout(() => (aviso.value = ''), 2200)
}

const agregarProducto = (producto) => {
  tienda.agregarProducto(producto)
  mostrarAviso(`${producto.nombre} agregado al carrito`)
}

const finalizarCompra = () => {
  if (tienda.finalizarCompra()) window.scrollTo({ top: 0, behavior: 'smooth' })
}

const nuevaCompra = () => {
  tienda.nuevaCompra()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const verCarrito = () => {
  if (tienda.mostrarFactura) return
  seccionCarrito.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <AppHeader :nombre-tienda="NOMBRE_TIENDA" :cantidad-items="totalUnidades" @ver-carrito="verCarrito" />

  <main class="principal">
    <FacturaCompra
      v-if="mostrarFactura"
      :nombre-tienda="NOMBRE_TIENDA"
      :items="carrito"
      :numero-factura="numeroFacturaTexto"
      :fecha="fechaFactura"
      :resumen="resumen"
      @nueva-compra="nuevaCompra"
    />

    <template v-else>
      <section class="portada" aria-label="Presentación">
        <p class="portada__sello">Nueva temporada · Hasta 30 % de descuento</p>
        <h1>Tecnología que impulsa tu día</h1>
        <p>Portátiles, audífonos, monitores y accesorios con los mejores precios en pesos colombianos.</p>
        <a class="boton portada__boton" href="#catalogo">Ver catálogo</a>
      </section>

      <div class="disposicion">
        <div id="catalogo" class="disposicion__catalogo">
          <ListaProductos :productos="productos" @agregar-producto="agregarProducto" />
        </div>

        <aside ref="seccionCarrito" class="disposicion__carrito">
          <CarritoCompra
            :items="carrito"
            :resumen="resumen"
            @incrementar="tienda.incrementar"
            @decrementar="tienda.decrementar"
            @eliminar="tienda.eliminar"
            @finalizar-compra="finalizarCompra"
          />
        </aside>
      </div>
    </template>
  </main>

  <Transition name="aviso">
    <div v-if="aviso" class="aviso" role="status">{{ aviso }}</div>
  </Transition>

  <AppFooter :nombre-tienda="NOMBRE_TIENDA" :anio="anioActual" :contacto="CONTACTO" />
</template>

<style scoped>
.principal { max-width: 1200px; margin: 0 auto; padding: 1.5rem 1.25rem 0; }
.portada {
  background: linear-gradient(135deg, #0b1220 0%, #12213f 60%, #1d3a7a 100%);
  color: #fff; border-radius: 22px; padding: 2.5rem 2rem; margin-bottom: 2rem;
  box-shadow: var(--sombra-fuerte);
}
.portada h1 { margin: 0.5rem 0; font-size: clamp(1.7rem, 4vw, 2.7rem); line-height: 1.15; max-width: 640px; }
.portada p { margin: 0 0 1.2rem; color: #cbd5e1; max-width: 560px; }
.portada .portada__sello { display: inline-block; margin: 0; padding: 0.3rem 0.8rem; border-radius: 999px; background: rgba(249, 115, 22, 0.18); color: #fdba74; font-weight: 700; font-size: 0.82rem; }
.portada__boton { display: inline-block; text-decoration: none; }
.disposicion { display: grid; grid-template-columns: minmax(0, 1fr) 380px; gap: 1.75rem; align-items: start; scroll-margin-top: 80px; }
.disposicion__catalogo { scroll-margin-top: 80px; }
.disposicion__carrito { position: sticky; top: 84px; scroll-margin-top: 84px; }
.aviso {
  position: fixed; left: 50%; bottom: 24px; transform: translateX(-50%); z-index: 50;
  background: var(--oscuro); color: #fff; padding: 0.8rem 1.3rem; border-radius: 14px;
  box-shadow: var(--sombra-fuerte); font-weight: 600; max-width: calc(100vw - 32px); text-align: center;
}
.aviso-enter-active, .aviso-leave-active { transition: opacity 0.25s, transform 0.25s; }
.aviso-enter-from, .aviso-leave-to { opacity: 0; transform: translate(-50%, 12px); }

@media (max-width: 980px) {
  .disposicion { grid-template-columns: 1fr; }
  .disposicion__carrito { position: static; }
}
@media (max-width: 520px) {
  .portada { padding: 1.6rem 1.2rem; border-radius: 18px; }
  .principal { padding-inline: 0.9rem; }
}
@media print {
  .aviso { display: none; }
}
</style>
