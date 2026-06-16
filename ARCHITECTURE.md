# Component Tree and Architecture Documentation

## Application Component Hierarchy

```
App (Router)
├── Navigation
│   ├── Home Link
│   ├── Shop Link
│   └── Admin Portal Link
│
├── Route: / (Home Page)
│   └── Home
│       └── useCoffeeData Hook
│           ├── Store Info Display
│           └── Info Cards (About, Mission, Contact)
│
├── Route: /shop (Shop Page)
│   └── Shop
│       ├── SearchBar
│       │   ├── Search Input
│       │   └── Location Filters
│       │
│       ├── Products Grid
│       │   └── ProductCard (multiple instances)
│       │       ├── Product Name
│       │       ├── Description
│       │       ├── Origin
│       │       └── Price Display
│       │
│       └── useCoffeeData Hook
│           ├── Search functionality
│           └── Product list management
│
└── Route: /admin (Admin Portal)
    └── AdminPortal
        ├── useCoffeeData Hook (for state)
        │   ├── addProduct()
        │   ├── updateProduct()
        │   └── deleteProduct()
        │
        ├── Product Form Section
        │   └── ProductForm
        │       ├── Name Input
        │       ├── Description Input
        │       ├── Origin Input
        │       ├── Price Input
        │       ├── Validation Logic
        │       └── Submit Button
        │
        └── Products Management Section
            ├── Products List
            │   └── Product Item (multiple instances)
            │       ├── ProductCard (editable mode)
            │       ├── Edit Button
            │       └── Delete Button
            │
            └── Success/Error Messages
```

## State Management Flow

### Global State (App Level)
- **Router State**: Current route/page
- **Navigation State**: Active navigation link

### Page-Level State

#### Home Page
- Store information (from useCoffeeData)

#### Shop Page
- Product list (from useCoffeeData)
- Search query (local state)
- Filtered products (computed from search)
- Selected location filter (local state)

#### Admin Portal
- Product list (from useCoffeeData)
- Editing product ID (local state)
- Form mode: 'add' or 'edit' (local state)
- Success/error messages (local state)

### Component-Level State

#### ProductForm
- Form data (name, description, origin, price)
- Validation errors

#### SearchBar
- Search query
- Selected location

## Data Flow Patterns

### Unidirectional Data Flow
1. Parent component manages state
2. State is passed to child components via props
3. Children trigger callbacks to update parent state
4. State changes cause re-render

### Search Flow
```
SearchBar Input → onChange event
      ↓
handleSearch callback
      ↓
Update filteredProducts state
      ↓
Pass filtered products to ProductCard components
      ↓
Re-render with new products
```

### Product Management Flow
```
ProductForm submit
      ↓
Validate form data
      ↓
Call useCoffeeData.addProduct() or updateProduct()
      ↓
Hook updates products state
      ↓
Component re-renders with new data
      ↓
Display success message
```

## Props Relationships

### Navigation Component
```javascript
Props: None (uses useLocation hook from React Router)
Emits: Navigation to different routes
```

### ProductCard Component
```javascript
Props: {
  product: Object,
  onEdit: Function (optional),
  editable: Boolean (optional),
  onPriceChange: Function (optional)
}
Emits: Click events on Edit button
```

### SearchBar Component
```javascript
Props: {
  onSearch: Function,
  locations: Array
}
Emits: Search queries and filter changes
```

### ProductForm Component
```javascript
Props: {
  onSubmit: Function,
  initialValues: Object (optional),
  isLoading: Boolean (optional)
}
Emits: Form submission with validated data
```

## Custom Hook: useCoffeeData

### State
```javascript
- products: Product[]
- storeInfo: StoreInfo
- locations: Location[]
- loading: Boolean
- error: String | null
```

### Methods
```javascript
fetchProducts(): Promise<Product[]>
addProduct(newProduct): Promise<Product>
updateProduct(id, updates): Promise<Product>
deleteProduct(id): Promise<void>
searchProducts(query): Product[]
getProductById(id): Product | undefined
```

### Data Structure

#### Product
```javascript
{
  id: Number,
  name: String,
  description: String,
  origin: String,
  price: Number
}
```

#### StoreInfo
```javascript
{
  id: Number,
  name: String,
  description: String,
  phone_number: String
}
```

#### Location
```javascript
{
  id: Number,
  name: String
}
```

## Event Handling

### Form Submission
1. User fills in form fields
2. onChange events update component state
3. User clicks submit
4. Form validation runs
5. If valid, onSubmit callback fires
6. Hook method updates state
7. Component re-renders with confirmation message

### Search
1. User types in search input
2. onChange event fires handleSearch
3. searchProducts() filters products
4. Component state updates with filtered results
5. ProductCard components re-render with new data

### Product Editing
1. User clicks Edit button
2. Component state changes to edit mode
3. ProductCard renders in editable mode
4. User modifies price
5. onChange fires handlePriceChange
6. updateProduct() is called
7. State updates, component re-renders

## Performance Optimizations

### useCallback
- Search function in Shop page
- Form submission handlers in AdminPortal
- Edit/delete/price change handlers

### Memoization
- Product filter operations cached by query
- Search results only recomputed when products or query changes

### Conditional Rendering
- Only render ProductForm when needed
- Conditional Edit/Delete buttons based on mode

## Testing Strategy

### Unit Tests

#### ProductCard.test.jsx
- Rendering product information
- Edit button visibility
- Price input rendering and changes

#### ProductForm.test.jsx
- Form field rendering
- Validation error display
- Form submission with valid data
- Pre-population with initial values

#### useCoffeeData.test.js
- Hook initialization
- Adding products
- Updating products
- Searching products
- Getting product by ID

### Integration Testing
- Navigation between pages
- Complete product addition flow
- Complete product editing flow
- Search and filter workflow

## Routing Configuration

```javascript
Route: /              → Home (landing page)
Route: /shop          → Shop (product browsing)
Route: /admin         → AdminPortal (management)
Route: * (default)    → Home (fallback)
```

## CSS Architecture

### Global Styles (index.css)
- CSS variables
- Base element styling
- Typography
- Forms and inputs

### Component Styles (Component.css)
- Scoped component styles
- Layout specifics
- Interactive states (hover, active, focus)
- Transitions and animations

### Responsive Breakpoints
- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: <768px

## Accessibility Features

### Semantic HTML
- `<nav>`, `<main>`, `<aside>`, `<section>`
- Proper heading hierarchy (h1, h2, h3)
- Form labels with htmlFor attributes

### ARIA Attributes
- `aria-label` for icon buttons
- `aria-describedby` for error messages
- `role="button"` where needed

### Keyboard Navigation
- Tab order properly maintained
- Enter key for form submission
- Escape key could be added for modals

### Screen Reader Support
- Alt text on images
- Form labels properly associated
- Loading and error states announced

---

**Component Tree Last Updated**: May 2026
**Architecture Version**: 1.0.0
