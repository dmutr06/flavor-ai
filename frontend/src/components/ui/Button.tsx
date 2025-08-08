import { tv } from "tailwind-variants";

const button = tv({
    base: "rounded-xl font-semibold transition-colors cursor-pointer",
    variants: {
        variant: {
            default: "bg-primary-400 text-white hover:bg-primary-500",
            outline: "border border-primary-400 text-primary-500 bg-primary-100/50 hover:bg-primary-100",
            ghost: "text-primary-500 hover:bg-primary-100",
        },
        size: {
            sm: "py-2 px-4 text-sm",
            md: "py-3 px-6",
            lg: "py-4 px-8 text-lg",
        },
        fullWidth: {
            true: "w-full",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "md",
        fullWidth: false,
    },
});

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: keyof typeof button.variants.variant;
    size?: keyof typeof button.variants.size;
    fullWidth?: boolean;
}

export function Button({
    children,
    className,
    variant,
    size,
    fullWidth,
    ...props
}: ButtonProps) {
    return (
        <button
            className={button({ variant, size, fullWidth, className })}
            {...props}
        >
            {children}
        </button>
    );
}
