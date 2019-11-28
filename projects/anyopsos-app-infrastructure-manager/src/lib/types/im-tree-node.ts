export interface ImTreeNode {
  name: string;
  type: string;
  uuid: string;
  info: any;
  children?: [] | ImTreeNode[];
}
