import {DvsFault} from './dvs-fault';


export interface VspanPortPromiscChangeFault extends DvsFault {
  portKey: string;
}