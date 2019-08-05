import {DvsFault} from './dvs-fault';

export interface VspanDestPortConflict extends DvsFault {
  portKey: string;
}
