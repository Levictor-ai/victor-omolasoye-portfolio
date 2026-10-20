'use client';

import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from 'react';
import { cn } from '@/lib/cn';

export interface FieldShellProps {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  htmlFor?: string;
  children: ReactNode;
  className?: string;
}

export function FieldShell({
  label,
  hint,
  error,
  required,
  htmlFor,
  children,
  className,
}: FieldShellProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <label htmlFor={htmlFor} className="text-sm font-ios font-medium text-ios-label">
          {label}
          {required && <span className="ml-0.5 text-ios-blue">*</span>}
        </label>
      )}
      {children}
      {error ? (
        <p className="text-xs font-medium text-ios-red">{error}</p>
      ) : (
        hint && <p className="text-xs text-ios-secondary">{hint}</p>
      )}
    </div>
  );
}

function controlClass(error?: boolean) {
  return cn(
    'w-full rounded-ios border border-transparent bg-ios-fill px-4 py-3.5 text-sm font-ios text-ios-label placeholder:text-ios-tertiary',
    'transition-all duration-200 focus:border-ios-blue/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-ios-blue/20',
    error &&
      'border-ios-red/40 bg-ios-red/5 focus:border-ios-red/50 focus:ring-ios-red/20',
    'disabled:cursor-not-allowed disabled:bg-ios-fill disabled:opacity-60',
  );
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  wrapperClassName?: string;
  icon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, error, wrapperClassName, icon, className, id, required, ...rest },
  ref,
) {
  const autoId = useId();
  const inputId = id ?? autoId;

  return (
    <FieldShell
      label={label}
      hint={hint}
      error={error}
      required={required}
      htmlFor={inputId}
      className={wrapperClassName}
    >
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ios-tertiary">
            {icon}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          required={required}
          aria-invalid={Boolean(error)}
          className={cn(controlClass(Boolean(error)), Boolean(icon) && 'pl-10', className)}
          {...rest}
        />
      </div>
    </FieldShell>
  );
});

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  wrapperClassName?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, hint, error, wrapperClassName, className, id, required, rows = 5, ...rest },
  ref,
) {
  const autoId = useId();
  const textareaId = id ?? autoId;

  return (
    <FieldShell
      label={label}
      hint={hint}
      error={error}
      required={required}
      htmlFor={textareaId}
      className={wrapperClassName}
    >
      <textarea
        ref={ref}
        id={textareaId}
        rows={rows}
        required={required}
        aria-invalid={Boolean(error)}
        className={cn(controlClass(Boolean(error)), 'resize-y', className)}
        {...rest}
      />
    </FieldShell>
  );
});

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  wrapperClassName?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, hint, error, wrapperClassName, className, id, required, children, ...rest },
  ref,
) {
  const autoId = useId();
  const selectId = id ?? autoId;

  return (
    <FieldShell
      label={label}
      hint={hint}
      error={error}
      required={required}
      htmlFor={selectId}
      className={wrapperClassName}
    >
      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          required={required}
          aria-invalid={Boolean(error)}
          className={cn(controlClass(Boolean(error)), 'appearance-none pr-10', className)}
          {...rest}
        >
          {children}
        </select>
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 fill-ios-tertiary"
        >
          <path d="M5.5 7.5 10 12l4.5-4.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </div>
    </FieldShell>
  );
});

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  children: ReactNode;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { children, className, id, ...rest },
  ref,
) {
  const autoId = useId();
  const checkboxId = id ?? autoId;

  return (
    <div className="flex items-start gap-3">
      <input
        ref={ref}
        id={checkboxId}
        type="checkbox"
        className={cn(
          'mt-0.5 size-4 flex-none cursor-pointer accent-[#314CB6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ios-blue/40',
          className,
        )}
        {...rest}
      />
      <label htmlFor={checkboxId} className="text-sm leading-relaxed text-ios-secondary">
        {children}
      </label>
    </div>
  );
});
