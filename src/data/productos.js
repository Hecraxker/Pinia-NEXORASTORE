import portatil from '../assets/images/portatil.svg'
import audifonos from '../assets/images/audifonos.svg'
import mouse from '../assets/images/mouse.svg'
import teclado from '../assets/images/teclado.svg'
import monitor from '../assets/images/monitor.svg'
import smartphone from '../assets/images/smartphone.svg'
import tablet from '../assets/images/tablet.svg'
import powerbank from '../assets/images/powerbank.svg'
import webcam from '../assets/images/webcam.svg'
import parlante from '../assets/images/parlante.svg'

// Datos iniciales del catálogo (el estado reactivo vive en App.vue)
export const catalogo = [
  { id: 1, nombre: 'Portátil Nexora Pro 15"', imagen: portatil, descripcion: 'Procesador Ryzen 7, 16 GB RAM, SSD 512 GB y pantalla Full HD.', valor: 2899000, descuento: 15 },
  { id: 2, nombre: 'Audífonos Aura ANC', imagen: audifonos, descripcion: 'Inalámbricos con cancelación activa de ruido y 30 h de batería.', valor: 189000, descuento: 20 },
  { id: 3, nombre: 'Mouse Flow Ergo', imagen: mouse, descripcion: 'Mouse inalámbrico ergonómico, 4000 DPI y conexión Bluetooth dual.', valor: 89000, descuento: 0 },
  { id: 4, nombre: 'Teclado Mecánico Kron', imagen: teclado, descripcion: 'Teclado mecánico 75 % con switches rojos e iluminación RGB.', valor: 159000, descuento: 10 },
  { id: 5, nombre: 'Monitor Vista 27" QHD', imagen: monitor, descripcion: 'Panel IPS 2K de 165 Hz, 1 ms y bordes ultradelgados.', valor: 799000, descuento: 0 },
  { id: 6, nombre: 'Smartphone Nova X', imagen: smartphone, descripcion: '128 GB, 8 GB RAM, pantalla AMOLED 6,6" y cámara de 50 MP.', valor: 1499000, descuento: 12 },
  { id: 7, nombre: 'Tablet Slate 10.9"', imagen: tablet, descripcion: 'Pantalla de alta resolución, 128 GB y lápiz digital compatible.', valor: 1199000, descuento: 25 },
  { id: 8, nombre: 'Power Bank Volt 20000', imagen: powerbank, descripcion: 'Batería externa de 20.000 mAh con carga rápida USB-C de 45 W.', valor: 129000, descuento: 0 },
  { id: 9, nombre: 'Webcam Clara Full HD', imagen: webcam, descripcion: 'Cámara 1080p con micrófono estéreo y enfoque automático.', valor: 119000, descuento: 0 },
  { id: 10, nombre: 'Parlante Pulse Bluetooth', imagen: parlante, descripcion: 'Sonido 360°, resistente al agua IPX7 y 12 horas de autonomía.', valor: 169000, descuento: 30 }
]
