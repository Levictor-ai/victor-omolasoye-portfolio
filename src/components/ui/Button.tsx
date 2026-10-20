import { forwardRef, type ButtonHTMLAttributes, type ComponentProps, type ReactNode } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'light';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

export interface ButtonStyleOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  block?: boolean;
  loading?: boolean;
  className?: string;
}

const VARIANT: Record<ButtonVariant, string> = {
  primary:
    'bg-ios-blue text-white shadow-ios-button hover:bg-ios-bluePressed active:bg-ios-bluePressed',
  secondary: 'bg-ios-label text-white hover:bg-black/80',
  outline:
    'bg-ios-fill text-ios-blue hover:bg-ios-fill-strong',
  ghost: 'text-ios-blue hover:bg-ios-fill',
  light: 'bg-white text-ios-label shadow-ios hover:bg-white/90',
};

const SIZE: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-sm sm:px-10',
  icon: 'size-11 p-0',
};

const BASE =
  'group inline-flex items-center justify-center gap-2 rounded-full font-semibold leading-none tracking-[-0.01em] whitespace-nowrap transition-all duration-200 ease-out active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ios-blue/40 disabled:pointer-events-none disabled:opacity-50 font-ios';

export function buttonClass({
  variant = 'primary',
  size = 'md',
  block = false,
  loading = false,
  className,
}: ButtonStyleOptions = {}): string {
  return cn(
    BASE,
    VARIANT[variant],
    SIZE[size],
    block && 'flex w-full',
    loading && 'pointer-events-none text-transparent',
    className,
  );
}

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonStyleOptions {
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant,
    size,
    block,
    loading = false,
    className,
    icon,
    iconPosition = 'right',
    children,
    disabled,
    type = 'button',
    ...rest
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      className={buttonClass({ variant, size, block, loading, className })}
      {...rest}
    >
      {loading ? (
        <Spinner />
      ) : (
        <>
          {icon && iconPosition === 'left' && <span className="inline-flex text-[1.15em]">{icon}</span>}
          {children}
          {icon && iconPosition === 'right' && (
            <span className="inline-flex text-[1.15em] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              {icon}
            </span>
          )}
        </>
      )}
    </button>
  );
});

export interface ButtonLinkProps
  extends Omit<ComponentProps<typeof Link>, 'className'>,
    ButtonStyleOptions {
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

export function ButtonLink({
  variant,
  size,
  block,
  loading = false,
  className,
  icon,
  iconPosition = 'right',
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <Link className={cn('group', buttonClass({ variant, size, block, loading, className }))} {...rest}>
      {icon && iconPosition === 'left' && <span className="inline-flex text-[1.15em]">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && (
        <span className="inline-flex text-[1.15em] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          {icon}
        </span>
      )}
    </Link>
  );
}

export function Spinner({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'inline-block size-4 animate-spin rounded-full border-2 border-current border-t-transparent',
        className,
      )}
    />
  );
}
