
import React from 'react';
import { FieldError } from 'react-hook-form';

type Input = React.InputHTMLAttributes<HTMLInputElement>;

interface InputProps extends Input {
  label: string;
  id: string;
  isRequired: boolean;
  error: FieldError | undefined;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ label, isRequired, id, error, ...props }, ref) => {
  return (
    <div className='flex flex-col gap-xs'>
      <label htmlFor={id} className='text-s font-600'>{`${label} ${isRequired ? '*' : ''}`}</label>
      <input
        className="bg-basicColors-dark bg-opacity-0 border h-xl text-xs p-xs focus:outline focus:outline-2 focus:outline-basicColors-light rounded-[0.3125rem] border-borderColors-borderLight"
        id={id}
        {...props}
        ref={ref}
      />
      {error && (
        <small className="text-cardColors-red text-xxxs">{error.message}</small>
      )}
    </div>
  );
})

export default Input;
