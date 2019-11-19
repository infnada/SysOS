import {ImConnection} from "./im-connection";
import {ImDataObject} from "../im-data-object";

export interface ConnectionNetapp extends ImConnection {
  type: 'netapp';
  host: string;
  port: number;
  credential: string;
  hophost?: string;
  hopport?: number;
  hopcredential?: string;
  data: {
    Base: {
      name: string;
    };
    Data: ImDataObject[];
  };
}
