import {ImConnection} from "./im-connection";
import {ImDataObject} from "../im-data-object";

export interface ConnectionVmware extends ImConnection {
  type: 'vmware';
  host: string;
  port: number;
  credential: string;
  hophost?: string;
  hopport?: number;
  hopcredential?: string;
  data: {
    nextVersion: number;
    Base: {
      name: string;
    };
    Data: ImDataObject[];
  };
}
