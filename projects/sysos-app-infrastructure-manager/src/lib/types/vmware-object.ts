export interface VMWareObject {
  name: string;
  obj: {
    type: string;
    name: string;
  };
  parent: {
    type: string;
    name: string;
  } | null;
  type: string;
}
