import {DvsFault} from './dvs-fault';

export interface VspanPortMoveFault extends DvsFault {
  destPortgroupName: string;
  portKey: string;
  srcPortgroupName: string;
}
