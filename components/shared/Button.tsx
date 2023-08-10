import clsx from 'clsx';

type ButtonVariant = 'primary' | 'hover' | 'active';
type ButtonSize = 'default' | 'medium' | 'small' | 'tiny' | 'square';
type ButtonText = 'default' | 'small';

type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  text?: ButtonText;
  label?: string;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-cardColors-black text-basicColors-light ',
  hover: 'bg-hoverColors-hover text-hoverColors-hoverMain',
  active: 'bg-basicColors-light text-basicColors-dark border-basicColors-light',
};

const sizeStyles: Record<ButtonSize, string> = {
  default: 'h-[56px]  w-[200px] rounded-[32px]',
  medium: 'h-[48px] w-[140px] rounded-[32px]',
  small: 'h-[40px]  w-[124px] rounded-[32px]',
  tiny: 'h-[32px] w-[90px] rounded-[32px]',
  square: 'w-[260px] h-45px] rounded-[4px]',
};

const textStyles: Record<ButtonText, string> = {
  default: 'text-s font-600',
  small: 'text-xxs font-500',
};

const disabledStyles = 'opacity-50';

export default function Button({
  variant = 'primary',
  size = 'default',
  className,
  disabled = false,
  label = 'Button',
  children = label,
  ...props
}: ButtonProps) {
  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];
  const disabledStyle = disabled ? disabledStyles : '';

  return (
    <button
      className={clsx(
        ' leading-m border-2 ',
        sizeStyle,
        disabledStyle,
        variantStyle,
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}