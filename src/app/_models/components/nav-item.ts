export interface NavItem {
  displayName: string;
  disabled?: boolean;
  iconName: string;
  image: string;
  route?: string;
  route_it?:string;
  children?: NavItem[];
  store?: number;
  enable?: boolean;
  visible?: boolean;
  active?: boolean;
  expanded?: boolean;
}
