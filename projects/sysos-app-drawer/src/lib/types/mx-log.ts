export interface mxLog {
  consoleName: string;
  TRACE: boolean;
  DEBUG: boolean;
  WARN: boolean;
  buffer: string;
  init(): void;
  info(): void;
  addButton(lab: any, funct: any): void;
  isVisible(): any;
  show(): void;
  setVisible(visible: any): void;
  enter(string: any): number;
  leave(string: any, t0: any): void;
  debug(): void;
  warn(): void;
  write(): void;
  writeln(): void;
}
