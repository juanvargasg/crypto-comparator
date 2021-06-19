import React from 'react';

/**
 * Input component for data entry
 * @param {string} label Input label
 * @param {string} id Input id
 * @param {string} type Input type, by default it is text
 * @param {string} value Input value
 * @param {bool} required Indicates if the input is required, by default it is false
 * @param {string} error Indicates if there is any validation error
 * @param {function} onChange Function that is executed when a change occurs in the input
 * @returns Component
 */
const Input = ({
  label,
  id,
  type = 'text',
  value,
  required = false,
  error = null,
  maxLength = 128,
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
        maxLength={maxLength}
        onChange={(e) => onChange(id, e.target.value)}
      />
      <label htmlFor={id}>{label}</label>
      {error && <small className="invalid-feedback">{error}</small>}
    </div>
  );
};

export default Input;
