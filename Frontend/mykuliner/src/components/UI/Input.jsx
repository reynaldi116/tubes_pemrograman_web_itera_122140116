import React from 'react';

const Input = ({ label, type = 'text', name, value, onChange, placeholder, error, required = false }) => {
  return (
    <div className="form-group">
      {label && <label htmlFor={name}>{label}{required && <span style={{color: 'red'}}>*</span>}</label>}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        style={error ? { borderColor: 'red' } : {}}
      />
      {error && <small style={{ color: 'red' }}>{error}</small>}
    </div>
  );
};

export default Input;