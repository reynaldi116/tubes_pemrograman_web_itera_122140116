// src/components/Dashboard/Filter.jsx
import React from 'react';

const Filter = ({ onFilterChange, onSortChange, currentFilters }) => {
  return (
    <div className="filter-controls card" style={{ marginBottom: '20px', padding: '15px', display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
      <div className="form-group" style={{marginBottom: 0}}>
        <label htmlFor="filterRating" style={{marginRight: '10px', marginBottom: 0, fontWeight: 'normal'}}>Filter Rating:</label>
        <select
          id="filterRating"
          name="rating"
          value={currentFilters.rating}
          onChange={(e) => onFilterChange('rating', e.target.value)}
          style={{padding: '8px', borderRadius: '4px', border: '1px solid #ccc'}}
        >
          <option value="">Semua Rating</option>
          <option value="5">★★★★★</option>
          <option value="4">★★★★☆ & Ke Atas</option>
          <option value="3">★★★☆☆ & Ke Atas</option>
          <option value="2">★★☆☆☆ & Ke Atas</option>
          <option value="1">★☆☆☆☆ & Ke Atas</option>
        </select>
      </div>

      <div className="form-group" style={{marginBottom: 0}}>
        <label htmlFor="sortOrder" style={{marginRight: '10px', marginBottom: 0, fontWeight: 'normal'}}>Urutkan Abjad:</label>
        <select
          id="sortOrder"
          name="sort"
          value={currentFilters.sort}
          onChange={(e) => onSortChange(e.target.value)}
          style={{padding: '8px', borderRadius: '4px', border: '1px solid #ccc'}}
        >
          <option value="default">Default (Terbaru)</option>
          <option value="name_asc">Nama Kuliner (A-Z)</option>
          <option value="name_desc">Nama Kuliner (Z-A)</option>
          <option value="restaurant_asc">Restoran (A-Z)</option>
          <option value="restaurant_desc">Restoran (Z-A)</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;