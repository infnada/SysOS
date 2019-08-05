import {DvsFault} from './dvs-fault';

export interface VspanPortgroupPromiscChangeFault extends DvsFault {
  portgroupName: string;
}
