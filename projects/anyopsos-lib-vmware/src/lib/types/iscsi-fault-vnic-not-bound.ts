import {IscsiFault} from './iscsi-fault';

export interface IscsiFaultVnicNotBound extends IscsiFault {
  vnicDevice: string;
}
