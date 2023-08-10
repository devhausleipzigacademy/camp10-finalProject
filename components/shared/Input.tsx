import React from 'react';

type Input = React.InputHTMLAttributes<HTMLInputElement>;

interface InputProps extends Input {
  label: string;
  name: string;
  isRequired: boolean;
};

function Input({ label, name, isRequired, ...props }: InputProps) {
  return (
    <>
      <label htmlFor={name}>{`${label} ${isRequired ? '*' : ''}`}</label>
      <input
        className="bg-basicColors-dark bg-opacity-0 border h-xl p-xs focus:outline focus:outline-2 focus:outline-basicColors-light rounded-[0.3125rem] border-borderColors-borderLight"
        id={name}
        {...props}
      />
    </>
  );
}

export default Input;
