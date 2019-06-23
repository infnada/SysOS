export interface ContextMenuItem {
  id: number;
  text: string | ((anything?: any) => string);
  action?: (file?) => void;
  disabled?: (anything?: any) => boolean;
  subMenu?: () => ContextMenuItem[];
}
