import {ImConnection} from './im-connection';
import {ImDataObject} from '../im-data-object';

export interface ConnectionLinux extends ImConnection {
  type: 'linux';
  host: string;
  port: number;
  credential: string;
  hophost?: string;
  hopport?: number;
  hopcredential?: string;
  data: {
    Data: ImDataObject[]
  }
}
