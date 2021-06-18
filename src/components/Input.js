import React from 'react';

const Input = ({
  label,
  id,
  type = 'text',
  value,
  required = false,
  onChange,
}) => {
  return (
    <div className="form-group">
      <input
        className="form-control"
        id={id}
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default Input;
