import {DvsFault} from './dvs-fault';

export interface VspanSameSessionPortConflict extends DvsFault {
  portKey: string;
  vspanSessionKey: string;
}
