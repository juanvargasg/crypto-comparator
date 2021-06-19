import React from 'react';

const Input = ({
  label,
  id,
  type = 'text',
  value,
  required = false,
  error = null,
  onChange,
}) => {
  return (
    <div className="form-group">
      <input
        className={`form-control${error ? ' invalid' : ''}`}
        id={id}
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(id, e.target.value)}
      />
      <label htmlFor={id}>{label}</label>
      {error && <small className="invalid-feedback">{error}</small>}
    </div>
  );
};

export default Input;
