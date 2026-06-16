import { describe, it, expect, vi } from "vitest";
import { render, screen, userEvent } from "@testing-library/react";
import { ProductForm } from "../../components/ProductForm";

describe("ProductForm Component", () => {
  it("renders form fields", () => {
    const mockOnSubmit = vi.fn();
    render(<ProductForm onSubmit={mockOnSubmit} />);

    expect(screen.getByLabelText(/coffee name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/origin/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/price/i)).toBeInTheDocument();
  });

  it("submits form with valid data", async () => {
    const mockOnSubmit = vi.fn();
    render(<ProductForm onSubmit={mockOnSubmit} />);

    const user = userEvent.setup();

    await user.type(
      screen.getByLabelText(/coffee name/i),
      "Test Coffee"
    );
    await user.type(
      screen.getByLabelText(/description/i),
      "Test description"
    );
    await user.type(
      screen.getByLabelText(/origin/i),
      "Test Origin"
    );
    await user.type(
      screen.getByLabelText(/price/i),
      "10.00"
    );

    const submitButton = screen.getByRole("button", {
      name: /add product/i,
    });
    await user.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledWith({
      name: "Test Coffee",
      description: "Test description",
      origin: "Test Origin",
      price: 10.0,
    });
  });

  it("shows validation errors for empty fields", async () => {
    const mockOnSubmit = vi.fn();
    render(<ProductForm onSubmit={mockOnSubmit} />);

    const user = userEvent.setup();
    const submitButton = screen.getByRole("button", {
      name: /add product/i,
    });
    await user.click(submitButton);

    expect(screen.getByText(/product name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/description is required/i)).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("renders with initial values for editing", () => {
    const initialValues = {
      name: "Existing Coffee",
      description: "Existing description",
      origin: "Existing Origin",
      price: "12.00",
    };

    render(
      <ProductForm
        onSubmit={() => {}}
        initialValues={initialValues}
      />
    );

    expect(screen.getByDisplayValue("Existing Coffee")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Existing description")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Existing Origin")).toBeInTheDocument();
  });
});
