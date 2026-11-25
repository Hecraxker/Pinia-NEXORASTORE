// Formato monetario único para catálogo, carrito y factura (COP sin decimales)
const formateador = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
})

export const formatoCOP = (valor) => formateador.format(valor)
