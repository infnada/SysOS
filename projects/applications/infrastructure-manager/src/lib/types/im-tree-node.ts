export interface ImTreeNode {
  name: string;
  type: string;
  info: {
    uuid: string;
    mainUuid?: string;
    obj: {
      type: string;
      name: string;
    };
    parent: {
      type: string;
      name: string;
    } | null;
    data: any;
  };
  children?: ImTreeNode[];
}
