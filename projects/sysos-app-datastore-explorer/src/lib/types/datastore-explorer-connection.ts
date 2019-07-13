import {NetAppVolume} from "@sysos/app-infrastructure-manager";

export interface DatastoreExplorerConnection {
  uuid?: string;
  credential: string;
  host: string;
  port: number;
  type: string;
  data: {
    datastore?:  {
      name: string;
      obj: {
        name: string;
      };
    };
    datacenter?: string;
    volume?: NetAppVolume
  };
  state?: string;
}
