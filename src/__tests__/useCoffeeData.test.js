import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCoffeeData } from "../../hooks/useCoffeeData";

describe("useCoffeeData Hook", () => {
  it("initializes with products", () => {
    const { result } = renderHook(() => useCoffeeData());

    expect(result.current.products).toBeDefined();
    expect(result.current.products.length).toBeGreaterThan(0);
    expect(result.current.storeInfo).toBeDefined();
  });

  it("adds a new product", async () => {
    const { result } = renderHook(() => useCoffeeData());
    const initialLength = result.current.products.length;

    const newProduct = {
      name: "New Coffee",
      description: "New description",
      origin: "New Origin",
      price: 15.0,
    };

    await act(async () => {
      await result.current.addProduct(newProduct);
    });

    expect(result.current.products.length).toBe(initialLength + 1);
    expect(result.current.products[initialLength].name).toBe("New Coffee");
  });

  it("updates a product", async () => {
    const { result } = renderHook(() => useCoffeeData());
    const productId = result.current.products[0].id;

    await act(async () => {
      await result.current.updateProduct(productId, {
        price: 20.0,
      });
    });

    const updated = result.current.products.find((p) => p.id === productId);
    expect(updated.price).toBe(20.0);
  });

  it("searches products", () => {
    const { result } = renderHook(() => useCoffeeData());

    const filtered = result.current.searchProducts("vanilla");

    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered[0].name.toLowerCase()).toContain("vanilla");
  });

  it("returns empty array for no matches", () => {
    const { result } = renderHook(() => useCoffeeData());

    const filtered = result.current.searchProducts("nonexistent");

    expect(filtered.length).toBe(0);
  });

  it("gets product by id", () => {
    const { result } = renderHook(() => useCoffeeData());
    const productId = result.current.products[0].id;

    const product = result.current.getProductById(productId);

    expect(product).toBeDefined();
    expect(product.id).toBe(productId);
  });
});
