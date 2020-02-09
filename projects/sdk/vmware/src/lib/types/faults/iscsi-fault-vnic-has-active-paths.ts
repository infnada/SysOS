import {IscsiFault} from './iscsi-fault';


export interface IscsiFaultVnicHasActivePaths extends IscsiFault {
  vnicDevice: string;
}