import {RuntimeFault} from './runtime-fault';


export interface ConflictingDatastoreFound extends RuntimeFault {
  name: string;
  url: string;
}