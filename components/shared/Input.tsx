
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


// interface Props extends Input {
//   id: string;
//   label: string;
//   isRequired: boolean;
// }

// const Input = React.forwardRef<HTMLInputElement, Props>(
//   ({ id, label, ...props }, ref) => {
//     return (
//       <div>
//         <label
//           htmlFor={id}
//           className="text-xs mx-6 text-neutral-400 font-semibold capitalize"
//         >
//           {label}
//         </label>
//         <input
//           ref={ref}
//           id={id}
//           className="border-solid border-gray border-2 px-6 py-2 text-sm text-neutral-500 rounded-md w-full focus:border-primary focus:outline-none"
//           {...props}
//         />
//         {/* {error && (
//           <small className="text-red-500 text-xs">{error.message}</small>
//         )} */}
//       </div>
//     );
//   }
// );

export default Input;
