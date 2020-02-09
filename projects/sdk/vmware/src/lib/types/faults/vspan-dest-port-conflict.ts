import {DvsFault} from './dvs-fault';


export interface VspanDestPortConflict extends DvsFault {
  portKey: string;
  vspanSessionKey1: string;
  vspanSessionKey2: string;
}