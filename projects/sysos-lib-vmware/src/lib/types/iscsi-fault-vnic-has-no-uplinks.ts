import {IscsiFault} from './iscsi-fault';

export interface IscsiFaultVnicHasNoUplinks extends IscsiFault {
  vnicDevice: string;
}
