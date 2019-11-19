export interface ImDataObject {
  name: string;
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
  type: string;
}
