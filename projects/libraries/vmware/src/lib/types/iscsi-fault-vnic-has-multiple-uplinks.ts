import {IscsiFault} from './iscsi-fault';

export interface IscsiFaultVnicHasMultipleUplinks extends IscsiFault {
  vnicDevice: string;
}
