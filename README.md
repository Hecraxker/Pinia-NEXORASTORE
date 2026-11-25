# NEXORA STORE — Tienda virtual por componentes (Vue 3)

Actividad **Vue 3 – Tienda virtual por componentes** (Fundamentos de programación).
Tienda de tecnología con catálogo, carrito de compras y factura, construida con Vue 3 y demostrando comunicación **padre → hijo (props)** e **hijo → padre (emits)**.

## Tecnologías
Vue 3 · Vite · JavaScript · Pinia · Composition API · `<script setup>` · `defineProps` · `defineEmits` · `ref` · `computed` · HTML · CSS.

## Estructura
```
src/
├── assets/
│   ├── styles/main.css        # variables y estilos globales
│   └── images/                # ilustraciones SVG locales de los productos
├── components/
│   ├── AppHeader.vue
│   ├── ListaProductos.vue
│   │   └── ProductoCard.vue  (se repite con v-for)
│   ├── CarritoCompra.vue
│   ├── FacturaCompra.vue
│   └── AppFooter.vue
├── data/productos.js          # datos iniciales del catálogo (10 productos)
├── stores/tiendaStore.js      # estado global, getters y actions de Pinia
├── utils/formato.js           # formato COP (Intl.NumberFormat es-CO)
├── utils/calculos.js          # valorConDescuento = valor × (1 − descuento/100)
├── App.vue                    # ÚNICO dueño del estado compartido
└── main.js
```

## Props por componente
| Componente | Props |
|---|---|
| AppHeader | `nombreTienda` (String), `cantidadItems` (Number) |
| ListaProductos | `productos` (Array) |
| ProductoCard | `producto` (Object, obligatoria) |
| CarritoCompra | `items` (Array de `{ producto, cantidad }`), `resumen` (Object con totales) |
| FacturaCompra | `items`, `numeroFactura`, `fecha`, `nombreTienda`, `resumen` |
| AppFooter | `nombreTienda`, `anio`, `contacto` |

## Emits (kebab-case)
| Componente | Evento | Payload |
|---|---|---|
| AppHeader | `ver-carrito` | — |
| ProductoCard | `agregar-al-carrito` | objeto producto |
| ListaProductos | `agregar-producto` | objeto producto |
| CarritoCompra | `incrementar`, `decrementar`, `eliminar` | id del producto |
| CarritoCompra | `finalizar-compra` | — |
| FacturaCompra | `nueva-compra` | — |
| AppFooter | (ninguno) | — |

## Flujo de comunicación
```
ProductoCard ─ agregar-al-carrito → ListaProductos ─ agregar-producto → App.vue
  → actualiza el carrito → props hacia Header, Carrito y Factura
```
ProductoCard **no** se conecta directamente con App.vue: ListaProductos reenvía el evento.

## Estado centralizado en App.vue
`App.vue` guarda con `ref`: `productos`, `carrito`, `mostrarFactura` y `numeroFactura`. Los hijos solo reciben datos por props y piden cambios por emits; nunca modifican props. Los totales se calculan con `computed` en App.vue y se envían como `resumen`, por lo que carrito y factura siempre coinciden:

```
subtotalRegular      = Σ valor × cantidad
totalDescuentos      = Σ (valor − valorConDescuento) × cantidad
subtotalConDescuento = subtotalRegular − totalDescuentos
iva (19 %)           = Math.round(subtotalConDescuento × 0.19)
totalPagar           = subtotalConDescuento + iva
```

La factura usa números consecutivos (`FACT-0001`, `FACT-0002`…); el consecutivo no se reinicia al pulsar *Nueva compra*.

## Instalación y ejecución
```bash
npm install
npm run dev        # http://localhost:5173/
npm run build      # compilación de producción en dist/
npm run preview    # vista previa de la compilación
```

## Pinia

El estado compartido de la aplicación se administra en `src/stores/tiendaStore.js`. El store contiene el catálogo, carrito, cantidades, cálculos de subtotal/descuentos/IVA/total y el proceso de facturación. Sus `computed` funcionan como getters y sus funciones como actions. Pinia se registra en `src/main.js` mediante `app.use(createPinia())`.

Para instalar dependencias y ejecutar el proyecto:
```bash
npm install
npm run dev
```
