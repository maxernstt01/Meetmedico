import type { ComponentType, ReactNode, SVGProps } from 'react';

export type NavigationMode = 'horizontal' | 'vertical';
export type NavigationLogoPosition = 'left' | 'center';
export type NavigationMenuAlign = 'start' | 'center' | 'end';
export type NavigationIcon = ComponentType<SVGProps<SVGSVGElement>>;

export interface NavigationItem {
  key: string;
  label: ReactNode;
  href?: string;
  icon?: NavigationIcon;
  children?: NavigationItem[];
  type?: 'item' | 'group';
  disabled?: boolean;
}

export interface NavigationProps {
  items: NavigationItem[];
  mode?: NavigationMode;

  activeKey?: string;
  defaultActiveKey?: string;
  onSelect?: (key: string) => void;

  openKeys?: string[];
  defaultOpenKeys?: string[];
  onOpenChange?: (openKeys: string[]) => void;
  accordion?: boolean;

  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  collapsible?: boolean;

  logo?: ReactNode;
  logoPosition?: NavigationLogoPosition;
  menuAlign?: NavigationMenuAlign;
  actions?: ReactNode;

  className?: string;
}
