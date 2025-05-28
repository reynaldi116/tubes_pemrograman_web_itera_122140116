import React, { useState } from 'react';
import Input from '../UI/Input.jsx';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <Input
        type="text"
        placeholder="Cari berdasarkan nama kuliner atau restoran..."
        value={searchTerm}
        onChange={handleSearchChange}
        name="search"
      />
    </div>
  );
};

export default SearchBar;