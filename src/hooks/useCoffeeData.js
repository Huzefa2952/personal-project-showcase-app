import { useState, useCallback, useEffect, useRef } from "react";
import { initialData, simulateApiDelay } from "../utils/mockData";

/**
 * Custom hook for managing coffee products data
 * Simulates API calls for GET, POST, and PATCH operations
 */
export const useCoffeeData = () => {
  const [products, setProducts] = useState(initialData.coffee);
  const [storeInfo, setStoreInfo] = useState(initialData.store_info[0]);
  const [locations, setLocations] = useState(initialData.locations);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const nextIdRef = useRef(initialData.coffee.length + 1);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/db.json");
        if (!response.ok) {
          throw new Error("Failed to load db.json");
        }

        const data = await response.json();

        if (!isMounted) return;

        const loadedProducts = data.coffee || initialData.coffee;
        const loadedStoreInfo = data.store_info?.[0] || initialData.store_info[0];
        const loadedLocations = data.locations || initialData.locations;

        setProducts(loadedProducts);
        setStoreInfo(loadedStoreInfo);
        setLocations(loadedLocations);
        nextIdRef.current = loadedProducts.length + 1;
      } catch (err) {
        if (!isMounted) return;
        setProducts(initialData.coffee);
        setStoreInfo(initialData.store_info[0]);
        setLocations(initialData.locations);
        setError("Using fallback product data.");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  /**
   * Simulates GET request to fetch all products
   */
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await simulateApiDelay();
      const response = await fetch("/db.json");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      const loadedProducts = data.coffee || initialData.coffee;
      setProducts(loadedProducts);
      return loadedProducts;
    } catch (err) {
      setError("Failed to fetch products");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

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
      const normalizedUpdates = { ...updates };

      if (normalizedUpdates.price !== undefined) {
        normalizedUpdates.price = parseFloat(normalizedUpdates.price);
      }

      setProducts((prev) =>
        prev.map((product) =>
          product.id === id
            ? { ...product, ...normalizedUpdates }
            : product
        )
      );
      return { id, ...normalizedUpdates };
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
