import { useState, useCallback, useRef } from "react";
import { initialData, simulateApiDelay } from "../utils/mockData";

/**
 * Custom hook for managing coffee products data
 * Simulates API calls for GET, POST, and PATCH operations
 */
export const useCoffeeData = () => {
  const [products, setProducts] = useState(initialData.coffee);
  const [storeInfo] = useState(initialData.store_info[0]);
  const [locations] = useState(initialData.locations);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const nextIdRef = useRef(initialData.coffee.length + 1);

  /**
   * Simulates GET request to fetch all products
   */
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await simulateApiDelay();
      return products;
    } catch (err) {
      setError("Failed to fetch products");
      throw err;
    } finally {
      setLoading(false);
    }
  }, [products]);

  /**
   * Simulates POST request to add a new product
   */
  const addProduct = useCallback(
    async (newProduct) => {
      setLoading(true);
      setError(null);
      try {
        await simulateApiDelay();
        const productWithId = {
          ...newProduct,
          id: nextIdRef.current,
          price: parseFloat(newProduct.price),
        };
        setProducts((prev) => [...prev, productWithId]);
        nextIdRef.current += 1;
        return productWithId;
      } catch (err) {
        setError("Failed to add product");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  /**
   * Simulates PATCH request to update a product
   */
  const updateProduct = useCallback(async (id, updates) => {
    setLoading(true);
    setError(null);
    try {
      await simulateApiDelay();
      setProducts((prev) =>
        prev.map((product) =>
          product.id === id
            ? { ...product, ...updates, price: parseFloat(updates.price) }
            : product
        )
      );
      return { id, ...updates };
    } catch (err) {
      setError("Failed to update product");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Simulates DELETE request to remove a product
   */
  const deleteProduct = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await simulateApiDelay();
      setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (err) {
      setError("Failed to delete product");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Searches products by name or description
   */
  const searchProducts = useCallback(
    (query) => {
      if (!query.trim()) {
        return products;
      }
      const lowerQuery = query.toLowerCase();
      return products.filter(
        (product) =>
          product.name.toLowerCase().includes(lowerQuery) ||
          product.description.toLowerCase().includes(lowerQuery) ||
          product.origin.toLowerCase().includes(lowerQuery)
      );
    },
    [products]
  );

  /**
   * Gets a product by ID
   */
  const getProductById = useCallback(
    (id) => {
      return products.find((product) => product.id === id);
    },
    [products]
  );

  return {
    products,
    storeInfo,
    locations,
    loading,
    error,
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    searchProducts,
    getProductById,
  };
};
