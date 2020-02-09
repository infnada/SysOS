import {IscsiFault} from './iscsi-fault';


export interface IscsiFaultVnicAlreadyBound extends IscsiFault {
  vnicDevice: string;
}