export interface mxCellPath {
  PATH_SEPARATOR: string;
  create(cell: any): string;
  getParentPath(path: any): any;
  resolve(root: any, path: any): any;
  compare(p1: any, p2: any): number;
}
