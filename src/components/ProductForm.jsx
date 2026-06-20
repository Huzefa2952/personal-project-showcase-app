import { useEffect, useState } from "react";
import "./ProductForm.css";

/**
 * ProductForm component for adding/editing products
 * Handles form validation and submission
 */
export function ProductForm({ onSubmit, initialValues = null, isLoading = false }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    origin: "",
    price: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialValues) {
      setFormData({
        name: initialValues.name || "",
        description: initialValues.description || "",
        origin: initialValues.origin || "",
        price: initialValues.price ?? "",
      });
    } else {
      setFormData({
        name: "",
        description: "",
        origin: "",
        price: "",
      });
    }
  }, [initialValues]);

  /**
   * Validates form data
   */
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.origin.trim()) {
      newErrors.origin = "Origin is required";
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = "Price must be a positive number";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      ...formData,
      price: parseFloat(formData.price),
    });

    // Reset form if not editing
    if (!initialValues) {
      setFormData({
        name: "",
        description: "",
        origin: "",
        price: "",
      });
    }
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Coffee Name *</label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g., Vanilla Bean"
          disabled={isLoading}
          aria-describedby={errors.name ? "error-name" : undefined}
        />
        {errors.name && (
          <span id="error-name" className="error-message">
            {errors.name}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="description">Description *</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe the coffee..."
          disabled={isLoading}
          rows="3"
          aria-describedby={errors.description ? "error-description" : undefined}
        />
        {errors.description && (
          <span id="error-description" className="error-message">
            {errors.description}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="origin">Origin *</label>
        <input
          id="origin"
          type="text"
          name="origin"
          value={formData.origin}
          onChange={handleChange}
          placeholder="e.g., Colombia"
          disabled={isLoading}
          aria-describedby={errors.origin ? "error-origin" : undefined}
        />
        {errors.origin && (
          <span id="error-origin" className="error-message">
            {errors.origin}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="price">Price ($) *</label>
        <input
          id="price"
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="e.g., 10.00"
          step="0.01"
          min="0"
          disabled={isLoading}
          aria-describedby={errors.price ? "error-price" : undefined}
        />
        {errors.price && (
          <span id="error-price" className="error-message">
            {errors.price}
          </span>
        )}
      </div>

      <button
        type="submit"
        className="submit-btn"
        disabled={isLoading}
        aria-label={initialValues ? "Update product" : "Add new product"}
      >
        {isLoading ? "Saving..." : initialValues ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
}
