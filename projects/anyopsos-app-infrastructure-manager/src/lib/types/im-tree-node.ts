export interface ImTreeNode {
  name: string;
  type: string;
  info: any;
  children?: [] | ImTreeNode[];
}
