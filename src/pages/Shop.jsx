import { useState, useCallback } from "react";
import { useCoffeeData } from "../hooks/useCoffeeData";
import { SearchBar } from "../components/SearchBar";
import { ProductCard } from "../components/ProductCard";
import "./Shop.css";

/**
 * Shop page component - Displays products with search functionality
 */
export function Shop() {
  const { products, locations, loading } = useCoffeeData();
  const [filteredProducts, setFilteredProducts] = useState(products);

  /**
   * Handles search and filtering of products
   */
  const handleSearch = useCallback(
    (query, location) => {
      let results = products;

      // Filter by search query
      if (query.trim()) {
        const lowerQuery = query.toLowerCase();
        results = results.filter(
          (product) =>
            product.name.toLowerCase().includes(lowerQuery) ||
            product.description.toLowerCase().includes(lowerQuery) ||
            product.origin.toLowerCase().includes(lowerQuery)
        );
      }

      // Filter by location (placeholder - can be expanded)
      if (location) {
        // In a real app, locations would be associated with products
        // For now, this is just a placeholder for the search component
      }

      setFilteredProducts(results);
    },
    [products]
  );

  return (
    <div className="shop-page">
      <div className="shop-container">
        <aside className="search-sidebar">
          <SearchBar onSearch={handleSearch} locations={locations} />
        </aside>

        <main className="products-section">
          {loading ? (
            <div className="loading">Loading products...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="no-results">
              <p>No products found. Try adjusting your search.</p>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
