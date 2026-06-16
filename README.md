# Coffee R Us - Personal Showcase App

A modern, responsive React-based e-commerce admin portal for managing a specialty coffee store. This Single Page Application (SPA) demonstrates advanced React concepts and best practices for frontend development.

## Features

- **Landing Page**: Introduction to Coffee R Us with store information
- **Shop Page**: Browse coffee products with dynamic search and filtering
- **Admin Portal**: Complete product management system (CRUD operations)
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices
- **Real-time Search**: Filter products by name, description, and origin
- **Price Management**: Update product prices directly in the admin portal
- **State Management**: Advanced React hooks (useState, useCallback, useRef)
- **Data Persistence**: Simulated backend with localStorage-like behavior
- **Component Testing**: Comprehensive unit tests using Vitest and React Testing Library
- **Modern Styling**: Clean, professional UI matching design mockups

## Project Structure

```
src/
├── components/
│   ├── Navigation.jsx        # Top navigation with active route highlighting
│   ├── Navigation.css        # Navigation styling
│   ├── ProductCard.jsx       # Product display component
│   ├── ProductCard.css       # Product card styling
│   ├── SearchBar.jsx         # Search and filter component
│   ├── SearchBar.css         # Search bar styling
│   ├── ProductForm.jsx       # Form for adding/editing products
│   └── ProductForm.css       # Product form styling
├── pages/
│   ├── Home.jsx             # Landing page
│   ├── Home.css             # Home page styling
│   ├── Shop.jsx             # Product browsing page
│   ├── Shop.css             # Shop page styling
│   ├── AdminPortal.jsx      # Admin management page
│   └── AdminPortal.css      # Admin portal styling
├── hooks/
│   └── useCoffeeData.js     # Custom hook for data management
├── utils/
│   └── mockData.js          # Mock product data
├── __tests__/
│   ├── ProductCard.test.jsx # ProductCard component tests
│   ├── ProductForm.test.jsx # ProductForm component tests
│   └── useCoffeeData.test.js # Custom hook tests
├── App.jsx                   # Main App component with routing
├── App.css                   # App styling
├── main.jsx                  # React entry point
└── index.css                 # Global styles
```

## Technology Stack

- **React 19.2.5**: Modern React with hooks and functional components
- **React Router 6.24.0**: Client-side routing and navigation
- **Vitest**: Fast unit testing framework
- **React Testing Library**: Component testing utilities
- **Vite**: Modern build tool and dev server
- **CSS3**: Responsive styling with flexbox and grid

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd personal-showcase-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The app will open at `http://localhost:5173`

## Usage

### Home Page
- View store information and mission
- Learn about Coffee R Us
- Navigate to other sections

### Shop Page
- Browse all available coffee products
- Search products by name, description, or origin
- Filter by location (if needed)
- View detailed product information

### Admin Portal
- **Add Products**: Use the form to add new coffee products
- **Edit Products**: Click "Edit" to modify existing products
- **Update Prices**: Change prices directly in edit mode
- **Delete Products**: Remove products from inventory
- **View Inventory**: See all products in a convenient list format

## Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm run test

# Run tests with UI
npm run test:ui

# Lint code
npm run lint
```

## API Integration (Mock)

The application uses a custom hook `useCoffeeData` that simulates the following API operations:

### GET Request
- Fetch all products
- Search and filter functionality

### POST Request
- Add new products with validation
- Automatic ID assignment

### PATCH Request
- Update product information
- Modify prices and details

### DELETE Request
- Remove products from inventory

All operations include:
- Simulated API delay (300ms) for realistic UX
- Error handling and state management
- Loading states during operations

## Mock Data

The application comes preloaded with 8 specialty coffee products:

- Vanilla Bean (Colombia, $10.00)
- House Blend (Vietnam, $12.00)
- Ethiopian Sunrise (Ethiopia, $14.00)
- Brazilian Santos (Brazil, $11.50)
- French Roast (Blend, $13.00)
- Kenyan AA (Kenya, $15.00)
- Sumatra Mandheling (Indonesia, $12.50)
- Espresso Blend (Blend, $13.50)

## Testing

The project includes comprehensive unit tests:

### ProductCard Tests
- Renders product information correctly
- Handles edit button visibility
- Manages editable state for price updates

### ProductForm Tests
- Form field validation
- Submission with valid data
- Error handling for empty fields
- Pre-population with initial values

### useCoffeeData Tests
- Product initialization
- Adding new products
- Updating product information
- Search functionality
- Product retrieval by ID

**Run tests:**
```bash
npm run test
npm run test:ui  # Opens interactive test UI
```

## Key Features Explained

### Advanced State Management
- **useState**: Local component state for forms and UI
- **useCallback**: Optimized function references for search and filtering
- **useRef**: Managing component IDs and persistence
- **Custom Hooks**: `useCoffeeData` for centralized data logic

### Client-Side Routing
- **React Router**: Seamless navigation between pages
- **Active Route Highlighting**: Visual feedback for current page
- **Nested Routes**: Flexible routing structure

### Component Architecture
- **Parent-Child Relationships**: Clean data flow
- **Props Drilling Prevention**: Custom hooks for shared state
- **Reusable Components**: ProductCard used in multiple contexts
- **Composition**: Building complex UIs from simple components

### Form Handling
- **Controlled Components**: Form inputs tied to state
- **Validation**: Real-time error checking
- **Error Display**: User-friendly error messages
- **Submission Handling**: Async-aware form processing

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Responsive Design Breakpoints

- Desktop: 1200px and above
- Tablet: 768px - 1199px
- Mobile: Below 768px

## Known Limitations

1. **Data Persistence**: Data is stored in component state only and resets on page refresh. For production, integrate with a real backend API.
2. **Authentication**: No user authentication implemented. This is suitable for demo purposes.
3. **Search Filters**: Location filtering is a UI placeholder. Can be enhanced with real location-based filtering.
4. **Image Support**: Product cards don't include images. Can be extended with image upload functionality.

## Future Enhancements

- [ ] Add product images and gallery
- [ ] Implement user authentication and authorization
- [ ] Add real backend API integration
- [ ] Implement localStorage for data persistence
- [ ] Add product ratings and reviews
- [ ] Create user dashboard for order history
- [ ] Implement shopping cart functionality
- [ ] Add payment integration
- [ ] Create advanced analytics dashboard
- [ ] Add multi-language support

## Code Quality

### Accessibility
- Semantic HTML elements
- ARIA labels and descriptions
- Keyboard navigation support
- Screen reader friendly

### Performance
- Optimized re-renders with useCallback
- Efficient search algorithms
- Lazy loading ready
- Minimal bundle size

### Maintainability
- Clear code comments
- Consistent naming conventions
- Modular component structure
- Comprehensive documentation

## Troubleshooting

### Port Already in Use
If port 5173 is already in use, Vite will automatically use the next available port.

### Module Not Found Errors
Ensure all dependencies are installed:
```bash
npm install
```

### Test Failures
Clear node_modules and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
npm run test
```

## Developer Notes

### Component Development
1. Create component file in appropriate folder
2. Add accompanying CSS file for styles
3. Include JSDoc comments for functions
4. Create tests in `__tests__` folder
5. Update documentation

### Adding New Products
Products can be added via the Admin Portal UI. To add initial products, modify `src/utils/mockData.js`:

```javascript
{
  id: 9,
  name: "New Coffee",
  description: "Description here",
  origin: "Origin here",
  price: 13.99
}
```

### Custom Hooks
The `useCoffeeData` hook handles all data operations. Extend it to:
- Add filtering functions
- Create derived state
- Manage additional data sources

## Contributing

1. Create a feature branch
2. Make your changes
3. Add/update tests
4. Update documentation
5. Create a pull request

## License

This project is part of Moringa School's summative assessment.

## Contact

For questions or issues, please contact the development team.

---

**Last Updated**: May 2026
**Version**: 1.0.0

