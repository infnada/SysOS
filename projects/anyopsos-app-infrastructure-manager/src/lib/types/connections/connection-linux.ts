import {ImConnection} from "./im-connection";

export interface ConnectionLinux extends ImConnection {
  type: 'linux';
  host: string;
  port: number;
  credential: string;
  hophost?: string;
  hopport?: number;
  hopcredential?: string;
}
