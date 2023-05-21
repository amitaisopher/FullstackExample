import { ButtonHTMLAttributes, FC, forwardRef } from 'react'
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean
}

const Button: FC<ButtonProps> = forwardRef<HTMLButtonElement, ButtonProps>(({
    className, children, variant, isLoading, size, ...props
}, ref) => {
    return <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} disabled={isLoading} {...props}>
        {isLoading ? <Loader2 className='mr-2 h-4 w-4 animate-spin'/> : null}
        {children}
    </button>;
});
export default Button