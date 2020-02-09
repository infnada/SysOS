import {IscsiFault} from './iscsi-fault';


export interface IscsiFaultVnicInUse extends IscsiFault {
  vnicDevice: string;
}