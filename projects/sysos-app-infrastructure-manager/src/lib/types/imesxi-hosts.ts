export interface IMESXiHost {
  virtual: {
    uuid: string;
    credential: string;
    host: string;
    port: number;
  };
  host: {
    connection_state: string;
    host: string;
    name: string;
    power_state: string;
    datacenter: string;
  };
}
