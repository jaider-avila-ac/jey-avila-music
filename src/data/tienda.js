// Productos de la tienda oficial que se muestran en el sitio (los últimos, máximo 5). Son datos
// fijos: cuando se suba un producto nuevo a la tienda, se agrega aquí ARRIBA (el más nuevo
// primero) con su foto en public/img/tienda/ (.webp y .jpg de respaldo para Safari viejo).

export const TIENDA_URL = 'https://tienda.jeyavilamusic.com'

export const PRODUCTOS_TIENDA = [
  {
    nombre: 'Camiseta Oversized Jey Avila',
    detalle: 'Tallas S a XL',
    precio: 45000,
    imagen: '/img/tienda/camiseta-oversized.webp',
    enlace: `${TIENDA_URL}/producto/camiseta-oversized-jey-avila`,
  },
  {
    nombre: 'Gorra Jey Avila',
    detalle: 'Talla única ajustable',
    precio: 40000,
    imagen: '/img/tienda/gorra.webp',
    enlace: `${TIENDA_URL}/producto/gorra-jey-avila`,
  },
]
