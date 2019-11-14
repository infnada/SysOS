export interface mxClipboard {
  STEPSIZE: number;
  insertCount: number;
  cells: any;
  setCells(cells: any): void;
  getCells(): any;
  isEmpty(): boolean;
  cut(graph: any, cells: any): any;
  removeCells(graph: any, cells: any): void;
  copy(graph: any, cells: any): any;
  paste(graph: any): any;
}
