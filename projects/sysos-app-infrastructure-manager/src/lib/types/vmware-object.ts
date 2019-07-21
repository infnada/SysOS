export interface VMWareObject {
  name: string;
  info: {
    name: string;
    type: string;
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
  type: string;
}
