// valorConDescuento = valor × (1 - descuento / 100), redondeado
export const valorConDescuento = (producto) =>
  Math.round(producto.valor * (1 - producto.descuento / 100))
