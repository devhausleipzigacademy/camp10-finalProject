import React, { HTMLProps } from "react"


export default function Checkbox({
  indeterminate,
  className = '',
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = React.useRef<HTMLInputElement>(null!)

  React.useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate
    }
  }, [ref, indeterminate])

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + 'hover:cursor-pointer form-checkbox h-m w-m bg-transparent text-cardColors-red border border-borderColors-borderLight rounded-sm'}
      {...rest}
    />
  )
}