import React from 'react';

type InputProps = {
  label: string;
  name: string;
  type: string;
  isRequired: boolean;
};

function Input({ label, name, type, isRequired }: InputProps) {
  return (
    <>
      <label htmlFor={name}>{`${label} ${isRequired ? '*' : ''}`}</label>
      <input
        className="bg-basicColors-dark bg-opacity-0 border h-xl p-xs focus:outline focus:outline-2 focus:outline-basicColors-light rounded-[0.3125rem] border-borderColors-borderLight  "
        type={type}
        name={name}
        id={name}
      />
    </>
  );
}

export default Input;