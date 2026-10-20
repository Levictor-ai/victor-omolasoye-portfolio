import type { ReactNode } from 'react';
import { AlertTriangle, CheckCircle2, Info, XCircle } from 'lucide-react';
import { cn } from '@/lib/cn';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

const ALERT_VARIANT: Record<AlertVariant, { wrapper: string; icon: string }> = {
  info: { wrapper: 'bg-ios-blue/10 border-ios-blue/15 text-ios-label', icon: 'text-ios-blue' },
  success: { wrapper: 'bg-ios-green/10 border-ios-green/20 text-ios-label', icon: 'text-ios-green' },
  warning: { wrapper: 'bg-ios-orange/10 border-ios-orange/20 text-ios-label', icon: 'text-ios-orange' },
  error: { wrapper: 'bg-ios-red/10 border-ios-red/20 text-ios-label', icon: 'text-ios-red' },
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
      className={cn('flex gap-3 rounded-ios-lg border p-4 font-ios text-sm', styles.wrapper, className)}
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
