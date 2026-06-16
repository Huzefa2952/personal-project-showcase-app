import { useState, useCallback } from "react";
import { useCoffeeData } from "../hooks/useCoffeeData";
import { ProductForm } from "../components/ProductForm";
import { ProductCard } from "../components/ProductCard";
import "./AdminPortal.css";

/**
 * AdminPortal page component - Allows administrators to manage products
 */
export function AdminPortal() {
  const {
    products,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
  } = useCoffeeData();

  const [editingId, setEditingId] = useState(null);
  const [formMode, setFormMode] = useState("add"); // 'add' or 'edit'
  const [successMessage, setSuccessMessage] = useState("");

  /**
   * Handles form submission for adding or updating products
   */
  const handleFormSubmit = useCallback(
    async (formData) => {
      try {
        if (formMode === "add") {
          await addProduct(formData);
          setSuccessMessage("Product added successfully!");
        } else {
          await updateProduct(editingId, formData);
          setSuccessMessage("Product updated successfully!");
          setEditingId(null);
          setFormMode("add");
        }
        setTimeout(() => setSuccessMessage(""), 3000);
      } catch (err) {
        console.error("Form submission error:", err);
      }
    },
    [formMode, editingId, addProduct, updateProduct]
  );

  /**
   * Handles editing a product
   */
  const handleEdit = useCallback((productId) => {
    setEditingId(productId);
    setFormMode("edit");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  /**
   * Handles deleting a product
   */
  const handleDelete = useCallback(
    async (productId) => {
      if (window.confirm("Are you sure you want to delete this product?")) {
        try {
          await deleteProduct(productId);
          setSuccessMessage("Product deleted successfully!");
          setTimeout(() => setSuccessMessage(""), 3000);
        } catch (err) {
          console.error("Delete error:", err);
        }
      }
    },
    [deleteProduct]
  );

  /**
   * Handles price updates
   */
  const handlePriceChange = useCallback(
    async (productId, newPrice) => {
      try {
        await updateProduct(productId, { price: newPrice });
      } catch (err) {
        console.error("Price update error:", err);
      }
    },
    [updateProduct]
  );

  /**
   * Handles canceling edit mode
   */
  const handleCancelEdit = () => {
    setEditingId(null);
    setFormMode("add");
  };

  const editingProduct =
    editingId && products.find((p) => p.id === editingId);

  return (
    <div className="admin-portal">
      <h1 className="page-title">Admin Portal</h1>

      {error && <div className="error-banner">{error}</div>}
      {successMessage && (
        <div className="success-banner">{successMessage}</div>
      )}

      <div className="admin-container">
        <section className="form-section">
          <h2>{formMode === "add" ? "Add New Product" : "Edit Product"}</h2>
          <ProductForm
            onSubmit={handleFormSubmit}
            initialValues={editingProduct}
            isLoading={loading}
          />
          {editingId && (
            <button className="cancel-btn" onClick={handleCancelEdit}>
              Cancel Edit
            </button>
          )}
        </section>

        <section className="products-section">
          <h2>Manage Products</h2>
          {loading && <div className="loading">Loading products...</div>}
          {products.length === 0 ? (
            <div className="no-products">No products yet.</div>
          ) : (
            <div className="products-list">
              {products.map((product) => (
                <div key={product.id} className="product-item">
                  <ProductCard
                    product={product}
                    editable={editingId === product.id}
                    onPriceChange={
                      editingId === product.id ? handlePriceChange : null
                    }
                    onEdit={editingId !== product.id ? handleEdit : null}
                  />
                  <div className="product-actions">
                    {editingId !== product.id && (
                      <>
                        <button
                          className="action-btn edit-action"
                          onClick={() => handleEdit(product.id)}
                          aria-label={`Edit ${product.name}`}
                        >
                          Edit
                        </button>
                        <button
                          className="action-btn delete-action"
                          onClick={() => handleDelete(product.id)}
                          aria-label={`Delete ${product.name}`}
                          disabled={loading}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
