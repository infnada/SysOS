export interface IMESXiHost {
  virtual: {
    uuid: string;
    credential: string;
    host: string;
    port: number;
  };
  host: {
    connectionState: string;
    host: string;
    name: string;
    powerState: string;
  };
}
