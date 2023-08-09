import React from 'react';

type SelectProps = {
  label: string;
  name: string;
  options: string[];
  isRequired: boolean;
};

function Select({ label, name, options, isRequired }: SelectProps) {
  return (
    <>
      <label htmlFor={name}>{`${label} ${isRequired ? '*' : ''}`}</label>
      <select
        className="bg-basicColors-dark bg-opacity-0 border rounded-md border-borderColors-borderLight "
        id={name}
        name={name}
      />
    </>
  );
}

export default Select;
