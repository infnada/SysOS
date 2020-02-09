import {DvsFault} from './dvs-fault';


export interface VspanPortgroupTypeChangeFault extends DvsFault {
  portgroupName: string;
}