import './RecommendedProducts.css';

const PLACEHOLDER_IMAGE =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"%3E%3Crect fill="%23f0f0f0" width="400" height="400"/%3E%3Ctext fill="%23999" font-family="system-ui,sans-serif" font-size="16" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle"%3EImagen no disponible%3C/text%3E%3C/svg%3E';

function ProductCard({ product, buttonLabel }) {
  const {
    id,
    name = 'Producto sin nombre',
    price = '—',
    image,
    url = '#',
    available = true,
  } = product;

  const productName = String(name || '').trim() || 'Producto sin nombre';
  const productUrl = String(url || '').trim() || '#';
  const imageSrc = image?.trim() ? image : PLACEHOLDER_IMAGE;
  const titleId = id != null ? `recommended-product-${id}-title` : undefined;

  return (
    <li className="recommended-products__item">
      <article className="recommended-products__card" aria-labelledby={titleId}>
        <a
          href={productUrl}
          className="recommended-products__media-link"
          aria-label={`${buttonLabel}: ${productName}`}
        >
          <div className="recommended-products__media">
            <img
              className="recommended-products__image"
              src={imageSrc}
              alt={productName}
              width={400}
              height={400}
              loading="lazy"
              decoding="async"
              onError={(e) => {
                e.currentTarget.src = PLACEHOLDER_IMAGE;
                e.currentTarget.onerror = null;
              }}
            />
            {!available && (
              <span className="recommended-products__badge" aria-hidden="true">
                Agotado
              </span>
            )}
          </div>
        </a>

        <div className="recommended-products__content">
          <h3 id={titleId} className="recommended-products__name">
            <a href={productUrl} className="recommended-products__name-link">
              {productName}
            </a>
          </h3>

          <p className="recommended-products__price">{price}</p>

          <a
            href={productUrl}
            className="recommended-products__button"
            aria-disabled={!available || undefined}
          >
            {buttonLabel}
          </a>
        </div>
      </article>
    </li>
  );
}

export default function RecommendedProducts({
  title = 'Productos recomendados',
  description = 'Descubre nuestra selección especial para ti.',
  products = [],
  buttonLabel = 'Ver producto',
  emptyMessage = 'Aún no hay productos recomendados. Vuelve pronto.',
  className = '',
}) {
  const items = Array.isArray(products) ? products.filter(Boolean) : [];
  const headingId = 'recommended-products-heading';
  const rootClass = ['recommended-products', className].filter(Boolean).join(' ');

  return (
    <section className={rootClass} aria-labelledby={headingId}>
      <div className="recommended-products__container">
        <header className="recommended-products__header">
          <h2 id={headingId} className="recommended-products__title">
            {title}
          </h2>
          {description && (
            <p className="recommended-products__description">{description}</p>
          )}
        </header>

        {items.length > 0 ? (
          <ul className="recommended-products__grid" role="list">
            {items.map((product, index) => (
              <ProductCard
                key={product.id ?? index}
                product={product}
                buttonLabel={buttonLabel}
              />
            ))}
          </ul>
        ) : (
          <div className="recommended-products__empty" role="status">
            <p className="recommended-products__empty-text">{emptyMessage}</p>
          </div>
        )}
      </div>
    </section>
  );
}
