export interface IMNode {
  name: string;
  type: string;
  info: any;
  children?: [] | IMNode[];
}
