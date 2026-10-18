import type { ReactNode } from 'react';
import { AlertTriangle, CheckCircle2, Info, XCircle } from 'lucide-react';
import { cn } from '@/lib/cn';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

const ALERT_VARIANT: Record<AlertVariant, { wrapper: string; icon: string }> = {
  info: { wrapper: 'bg-blue-50 border-blue-100 text-blue-900', icon: 'text-blue-600' },
  success: { wrapper: 'bg-emerald-50 border-emerald-100 text-emerald-900', icon: 'text-emerald-600' },
  warning: { wrapper: 'bg-amber-50 border-amber-100 text-amber-900', icon: 'text-amber-600' },
  error: { wrapper: 'bg-red-50 border-red-100 text-red-900', icon: 'text-red-600' },
};

const ICONS: Record<AlertVariant, typeof Info> = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: XCircle,
};

export interface AlertProps {
  children: ReactNode;
  title?: ReactNode;
  variant?: AlertVariant;
  icon?: ReactNode;
  className?: string;
}

export function Alert({ children, title, variant = 'info', icon, className }: AlertProps) {
  const Icon = ICONS[variant];
  const styles = ALERT_VARIANT[variant];

  return (
    <div
      role="alert"
      className={cn('flex gap-3 rounded-xl border p-4 text-sm', styles.wrapper, className)}
    >
      <span className={cn('mt-0.5 flex-none', styles.icon)}>
        {icon ?? <Icon className="size-5" />}
      </span>
      <div className="flex flex-col gap-1">
        {title && <p className="font-semibold leading-snug">{title}</p>}
        <div className="leading-relaxed opacity-90">{children}</div>
      </div>
    </div>
  );
}
