import {IscsiFault} from './iscsi-fault';

export interface IscsiFaultVnicHasWrongUplink extends IscsiFault {
  vnicDevice: string;
}
