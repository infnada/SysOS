export interface mxStyleRegistry {
  values: any[];
  putValue(name: any, obj: any): void;
  getValue(name: any): any;
  getName(value: any): string;
}
