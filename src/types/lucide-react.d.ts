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
  export const CheckCircle: Icon;
  export const Quote: Icon;
  export const Layers: Icon;
  export const Server: Icon;
  export const Palette: Icon;
  export const Wrench: Icon;
  export const Clock: Icon;
  export const ChevronDown: Icon;
}
