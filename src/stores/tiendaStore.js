import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { catalogo } from '../data/productos'
import { valorConDescuento } from '../utils/calculos'

const TASA_IVA = 0.19

export const useTiendaStore = defineStore('tienda', () => {
  // Estado global de la tienda: catálogo, carrito y proceso de compra.
  const productos = ref(catalogo)
  const carrito = ref([]) // [{ producto, cantidad }]
  const mostrarFactura = ref(false)
  const numeroFactura = ref(1)
  const fechaFactura = ref('')

  // Getters: valores calculados automáticamente cuando cambia el estado.
  const totalUnidades = computed(() =>
    carrito.value.reduce((total, item) => total + item.cantidad, 0)
  )
  const subtotalRegular = computed(() =>
    carrito.value.reduce((total, item) => total + item.producto.valor * item.cantidad, 0)
  )
  const totalDescuentos = computed(() =>
    carrito.value.reduce(
      (total, item) => total + (item.producto.valor - valorConDescuento(item.producto)) * item.cantidad,
      0
    )
  )
  const subtotalConDescuento = computed(() => subtotalRegular.value - totalDescuentos.value)
  const iva = computed(() => Math.round(subtotalConDescuento.value * TASA_IVA))
  const totalPagar = computed(() => subtotalConDescuento.value + iva.value)
  const resumen = computed(() => ({
    subtotalRegular: subtotalRegular.value,
    totalDescuentos: totalDescuentos.value,
    subtotalConDescuento: subtotalConDescuento.value,
    iva: iva.value,
    totalPagar: totalPagar.value,
    totalUnidades: totalUnidades.value
  }))
  const numeroFacturaTexto = computed(() => `FACT-${String(numeroFactura.value).padStart(4, '0')}`)

  // Actions: funciones que modifican el estado compartido.
  function agregarProducto(producto) {
    const existente = carrito.value.find((item) => item.producto.id === producto.id)
    if (existente) existente.cantidad += 1
    else carrito.value.push({ producto, cantidad: 1 })
  }

  function incrementar(id) {
    const item = carrito.value.find((producto) => producto.producto.id === id)
    if (item) item.cantidad += 1
  }

  function decrementar(id) {
    const item = carrito.value.find((producto) => producto.producto.id === id)
    if (!item) return
    item.cantidad -= 1
    if (item.cantidad <= 0) eliminar(id)
  }

  function eliminar(id) {
    carrito.value = carrito.value.filter((item) => item.producto.id !== id)
  }

  function finalizarCompra() {
    if (carrito.value.length === 0) return false
    fechaFactura.value = new Date().toLocaleString('es-CO', {
      dateStyle: 'long',
      timeStyle: 'short'
    })
    mostrarFactura.value = true
    return true
  }

  function nuevaCompra() {
    carrito.value = []
    mostrarFactura.value = false
    fechaFactura.value = ''
    numeroFactura.value += 1
  }

  return {
    productos, carrito, mostrarFactura, numeroFactura, fechaFactura,
    totalUnidades, subtotalRegular, totalDescuentos, subtotalConDescuento,
    iva, totalPagar, resumen, numeroFacturaTexto,
    agregarProducto, incrementar, decrementar, eliminar, finalizarCompra, nuevaCompra
  }
})
