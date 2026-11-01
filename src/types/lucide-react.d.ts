declare module 'lucide-react' {
  import type { FC, SVGProps } from 'react';

  export interface IconProps extends SVGProps<SVGSVGElement> {
    size?: number | string;
    absoluteStrokeWidth?: boolean;
  }

  export type Icon = FC<IconProps>;

  export const ExternalLink: Icon;
  export const Users: Icon;
  export const MapPin: Icon;
  export const Calendar: Icon;
  export const ArrowUpRight: Icon;
  export const ArrowLeft: Icon;
  export const CheckCircle: Icon;
  export const CheckCircle2: Icon;
  export const Check: Icon;
  export const Minus: Icon;
  export const Plus: Icon;
  export const Star: Icon;
  export const Info: Icon;
  export const XCircle: Icon;
  export const AlertTriangle: Icon;
  export const Quote: Icon;
  export const Layers: Icon;
  export const Server: Icon;
  export const Palette: Icon;
  export const Wrench: Icon;
  export const Clock: Icon;
  export const ChevronDown: Icon;
  export const ChevronRight: Icon;
  export const LayoutGrid: Icon;
  export const PenTool: Icon;
  export const Smartphone: Icon;
  export const Mail: Icon;
  export const BadgeCheck: Icon;
  export const FileText: Icon;
  export const Lock: Icon;
  export const LogOut: Icon;
  export const Globe: Icon;
  export const Globe2: Icon;
  export const TrendingUp: Icon;
  export const MousePointerClick: Icon;
  export const KeyRound: Icon;
  export const RefreshCw: Icon;
  export const ShieldCheck: Icon;
  export const Download: Icon;
}
