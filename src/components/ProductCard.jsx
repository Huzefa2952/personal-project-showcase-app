import "./ProductCard.css";

/**
 * ProductCard component for displaying individual products
 * Shows product details and allows editing
 */
export function ProductCard({
  product,
  onEdit = null,
  editable = false,
  onPriceChange = null,
}) {
  const handlePriceChange = (e) => {
    const newPrice = e.target.value;
    onPriceChange?.(product.id, parseFloat(newPrice) || newPrice);
  };

  return (
    <div className="product-card">
      <h3 className="product-name">{product.name}</h3>
      <p className="product-description">{product.description}</p>
      <p className="product-origin">
        <strong>Origin:</strong> {product.origin}
      </p>

      {editable ? (
        <div className="product-price-editor">
          <label htmlFor={`price-${product.id}`}>Price: $</label>
          <input
            id={`price-${product.id}`}
            type="number"
            step="0.01"
            value={product.price}
            onChange={handlePriceChange}
            min="0"
            aria-label={`Edit price for ${product.name}`}
          />
        </div>
      ) : (
        <p className="product-price">${product.price.toFixed(2)}</p>
      )}

      {onEdit && (
        <button
          className="edit-btn"
          onClick={() => onEdit(product.id)}
          aria-label={`Edit ${product.name}`}
        >
          Edit
        </button>
      )}
    </div>
  );
}
