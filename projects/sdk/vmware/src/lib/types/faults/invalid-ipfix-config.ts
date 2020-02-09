import {DvsFault} from './dvs-fault';


export interface InvalidIpfixConfig extends DvsFault {
  property?: string;
}