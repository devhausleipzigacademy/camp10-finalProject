import React from 'react';
import { FieldError, Merge } from 'react-hook-form';

type Select = React.SelectHTMLAttributes<HTMLSelectElement>

interface SelectProps extends Select {
  id: string
  label: string;
  options: string[];
  isRequired: boolean;
  error: Merge<FieldError, (FieldError | undefined)[]> | undefined;
};

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({ id, label, isRequired, options, error, ...props }, ref) => {
  return (
    <div className='flex flex-col gap-xs'>
      <label htmlFor={id} className='text-s font-600'>{`${label} ${isRequired ? '*' : ''}`}</label>
      <select
        className="bg-basicColors-dark bg-opacity-0 h-xl p-xs border rounded-[0.3125rem] border-borderColors-borderLight focus:outline focus:outline-2 focus:outline-basicColors-light"
        id={id}
        {...props}
        ref={ref}
        defaultValue={''}
      >
        <option disabled value={''}></option>
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
      {error && (
        <small className="text-cardColors-red text-xxxs">{error.message}</small>
      )}
    </div>
  );
})

export default Select;
