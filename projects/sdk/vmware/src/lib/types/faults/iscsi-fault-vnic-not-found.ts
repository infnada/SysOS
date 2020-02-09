import {IscsiFault} from './iscsi-fault';


export interface IscsiFaultVnicNotFound extends IscsiFault {
  vnicDevice: string;
}