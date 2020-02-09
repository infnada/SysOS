import {FcoeFault} from './fcoe-fault';


export interface FcoeFaultPnicHasNoPortSet extends FcoeFault {
  nicDevice: string;
}