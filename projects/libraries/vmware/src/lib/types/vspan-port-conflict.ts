import {DvsFault} from './dvs-fault';

export interface VspanPortConflict extends DvsFault {
  portKey: string;
}
