import {IscsiFault} from './iscsi-fault';

export interface IscsiFaultInvalidVnic extends IscsiFault {
  vnicDevice: string;
}
