export interface ContextMenuItem {
  id: number;
  text: string | Function;
  action?: Function;
  disabled?: Function;
}
