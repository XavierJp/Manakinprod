import React from 'react';
import './styles.scss';

const Select = ({ label, values, onSelect, feminine = false }) => {
  const click = (e) => {
    onSelect(e && e.target && e.target.value);
  };

  return (
    <div className="select">
      <select name={label} onClick={click}>
        <option value="">
          Séléctionnez un{feminine && 'e'} {label}
        </option>
        <option value="">
          ← Tou{feminine && 'te'}s les {label}s →
        </option>
        {values.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
