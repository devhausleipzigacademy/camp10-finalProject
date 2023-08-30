import { cn } from '@/lib/utils';
type ButtonVariant = 'primary';
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
    primary:
        'bg-cardColors-black text-basicColors-light hover:bg-hoverColors-hover hover:text-hoverColors-hoverMain',
};

const sizeStyles: Record<ButtonSize, string> = {
    small: 'h-[40px]  w-[124px] px-s rounded-[32px] border',
    tiny: 'h-[32px] w-[90px] px-s rounded-[32px] border',
    square: 'w-full h-[45px] rounded-[4px] border',
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
                'leading-m',
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
