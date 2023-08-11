
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
    <>
      <label htmlFor={id}>{`${label} ${isRequired ? '*' : ''}`}</label>
      <input
        className="bg-basicColors-dark bg-opacity-0 border h-xl p-xs focus:outline focus:outline-2 focus:outline-basicColors-light rounded-[0.3125rem] border-borderColors-borderLight"
        id={id}
        {...props}
        ref={ref}
      />
      {error && (
        <small className="text-cardColors-red text-xxxs">{error.message}</small>
      )}
    </>
  );
})

export default Input;
