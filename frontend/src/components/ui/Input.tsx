import { tv } from "tailwind-variants";

export const input = tv(
    {
        base: "w-full border rounded-xl py-3 px-4 font-medium transition focus:outline-none",
        variants: {
            intent: {
                default: "border-primary-400 bg-white text-black focus:ring-2 focus:ring-primary-500",
                error: "border-red-500 bg-white text-black focus:ring-2 focus:ring-red-500",
            },
        },
        defaultVariants: {
            intent: "default",
        },
    },
);
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    intent?: "default" | "error";
}

export function Input({ intent, className, ...props }: InputProps) {
    return (
        <input
            className={input({ intent, className })}
            {...props}
        />
    );
}
