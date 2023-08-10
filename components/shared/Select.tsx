import React from 'react';

type Select = React.SelectHTMLAttributes<HTMLSelectElement>

interface SelectProps extends Select {
  label: string;
  name: string;
  options: string[];
  isRequired: boolean;
};

function Select({ label, name, isRequired, options, ...props }: SelectProps) {
  return (
    <>
      <label htmlFor={name}>{`${label} ${isRequired ? '*' : ''}`}</label>
      <select
        className="bg-basicColors-dark bg-opacity-0 h-xl p-xs border rounded-[0.3125rem] border-borderColors-borderLight focus:outline focus:outline-2 focus:outline-basicColors-light"
        id={name}
        name={name}
        {...props}
      >
        {options.map(opt => (
          <option
            className="text-textColors-textBody bg-opacity-5 p-xs"
            key={opt}
            value={opt}
          >
            {opt}
          </option>
        ))}
      </select>
    </>
  );
}

export default Select;
