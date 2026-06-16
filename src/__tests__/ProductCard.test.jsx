import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProductCard } from "../../components/ProductCard";

describe("ProductCard Component", () => {
  const mockProduct = {
    id: 1,
    name: "Test Coffee",
    description: "A test description",
    origin: "Test Origin",
    price: 10.5,
  };

  it("renders product information correctly", () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText("Test Coffee")).toBeInTheDocument();
    expect(screen.getByText("A test description")).toBeInTheDocument();
    expect(screen.getByText(/Test Origin/)).toBeInTheDocument();
    expect(screen.getByText("$10.50")).toBeInTheDocument();
  });

  it("renders edit button when onEdit is provided", () => {
    const mockOnEdit = () => {};
    render(<ProductCard product={mockProduct} onEdit={mockOnEdit} />);

    const editButton = screen.getByRole("button", { name: /edit/i });
    expect(editButton).toBeInTheDocument();
  });

  it("does not render edit button when onEdit is not provided", () => {
    render(<ProductCard product={mockProduct} />);

    const editButton = screen.queryByRole("button", { name: /edit/i });
    expect(editButton).not.toBeInTheDocument();
  });

  it("renders price input when editable is true", () => {
    render(<ProductCard product={mockProduct} editable={true} />);

    const priceInput = screen.getByRole("spinbutton", {
      name: /edit price/i,
    });
    expect(priceInput).toBeInTheDocument();
    expect(priceInput.value).toBe("10.5");
  });
});
