import {DvsFault} from './dvs-fault';


export interface VspanPortConflict extends DvsFault {
  portKey: string;
  vspanSessionKey1: string;
  vspanSessionKey2: string;
}