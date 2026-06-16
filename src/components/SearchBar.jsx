import { useState, useCallback } from "react";
import "./SearchBar.css";

/**
 * SearchBar component for filtering products
 * Debounces search input to optimize performance
 */
export function SearchBar({ onSearch, locations = [] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const handleSearch = useCallback(
    (e) => {
      const value = e.target.value;
      setSearchQuery(value);
      onSearch?.(value, selectedLocation);
    },
    [onSearch, selectedLocation]
  );

  const handleLocationChange = useCallback(
    (e) => {
      const value = e.target.value;
      setSelectedLocation(value);
      onSearch?.(searchQuery, value);
    },
    [onSearch, searchQuery]
  );

  const handleClear = () => {
    setSearchQuery("");
    setSelectedLocation("");
    onSearch?.("", "");
  };

  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <input
          type="text"
          className="search-input"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearch}
          aria-label="Search products"
        />
        {searchQuery && (
          <button
            className="clear-btn"
            onClick={handleClear}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>

      {locations.length > 0 && (
        <div className="filters">
          {locations.map((location) => (
            <label key={location.id} className="filter-label">
              <input
                type="checkbox"
                value={location.name}
                checked={selectedLocation === location.name}
                onChange={handleLocationChange}
                aria-label={`Filter by ${location.name}`}
              />
              {location.name}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
