import { cn } from '@/lib/utils';
type ButtonVariant = 'primary' | 'secondary';
type ButtonSize = 'small' | 'tiny' | 'square';
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
    primary: 'bg-cardColors-black bg-opacity-0 text-basicColors-light',
    secondary: 'bg-basicColors-light text-basicColors-dark',
};

const sizeStyles: Record<ButtonSize, string> = {
    small: 'h-[40px]  min-w-[124px] px-s rounded-[32px] border text-lg',
    tiny: 'h-[32px] min-w-[90px] px-s rounded-[32px] border text-lg',
    square: 'min-w-full h-[45px] rounded-[4px] border text-lg',
};

const disabledStyles = 'opacity-50';

export default function Button({
    variant = 'primary',
    size = 'small',
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
            className={cn(
                'leading-m hover:bg-hoverColors-hover hover:text-hoverColors-hoverMain',
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
