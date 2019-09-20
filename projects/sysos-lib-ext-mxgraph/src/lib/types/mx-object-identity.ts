export interface mxObjectIdentity {
  FIELD_NAME: string;
  counter: number;
  get(obj: any): any;
  clear(obj: any): void;
}
