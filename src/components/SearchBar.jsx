import React from 'react';

function SearchBar({ searchQuery, onSearchChange, onToggle }) {
  return (
    <div className="search-bar">
      <button onClick={onToggle} className="search-button">
        🔍
      </button>
      {searchQuery && (
        <input
          type="text"
          value={searchQuery}
          onChange={onSearchChange}
          placeholder="Buscar notas..."
          className="search-input"
        />
      )}
    </div>
  );
}

export default SearchBar;
