# Productos recomendados

Sección Shopify + componente React. Grid de productos manual desde el Theme Editor.

## Archivos

```
sections/recommended-products-custom.liquid
snippets/recommended-product-card.liquid
assets/recommended-products-custom.css
RecommendedProducts.jsx
RecommendedProducts.css
```

El layout va con CSS Grid y las imágenes con `loading="lazy"`.

## Instalación (Shopify)

Copiar al theme:

| Archivo | Destino |
|---------|---------|
| `sections/recommended-products-custom.liquid` | `theme/sections/` |
| `snippets/recommended-product-card.liquid` | `theme/snippets/` |
| `assets/recommended-products-custom.css` | `theme/assets/` |

Con Shopify CLI:

```bash
shopify theme push --only sections/recommended-products-custom.liquid
shopify theme push --only snippets/recommended-product-card.liquid
shopify theme push --only assets/recommended-products-custom.css
```

En el Theme Editor busca: **Add section → Productos recomendados**. Configurar título, descripción y productos.

### Uso desde marketing

1. Abrir la página en Customize.
2. Editar título y descripción.
3. Elegir productos en el campo **Productos** (selector múltiple, hasta 12).
4. Si ese campo está vacío, se usan los bloques **Producto** (uno por bloque, reordenables).

La lista de productos tiene prioridad sobre los bloques.

## React

```jsx
import RecommendedProducts from './RecommendedProducts';

<RecommendedProducts
  title="Productos recomendados"
  description="Descubre nuestra selección especial para ti."
  products={[
    { id: 1, name: 'Producto 1', price: '$120.000', image: '/img.jpg', url: '/p/1', available: true },
    { id: 2, name: 'Producto 2', price: '$89.990', image: '', url: '/p/2', available: false },
  ]}
/>
```

Props: `title`, `description`, `products`, `buttonLabel`, `emptyMessage`, `className`.

## Decisiones técnicas

**Blocks vs metafields:** Usé blocks y `product_list` porque encajan son fáciles de editar en el Theme Editor.

**Performance:** Render server-side en Liquid, imágenes con `image_url` + `srcset`, sin librerias extras. `loading="lazy"` en las tarjetas.

**Accesibilidad:** HTML semántico (`section`, `article`, `h2`/`h3`), alt en imágenes, badge de agotado, estados de foco visibles.

**Estados cubiertos:** Sin productos, sin imagen, placeholder SVG, producto agotado, precio tachado si hay compare_at_price.

## Mejoras futuras

**Slider** Ahorra espacio vertical y es mas llamativo para el comprador.

## Deploy

Flujo habitual: rama -> PR -> preview del theme -> merge -> `shopify theme push`. Mantener un theme de backup en Admin por si hay que revertir y si hay mas de un desarrollador tocando el mismo archivo, crear rama individual por dev -> rama por feat -> pull -> merge a rama del dev -> PR
