import {IscsiFault} from './iscsi-fault';


export interface IscsiFaultPnicInUse extends IscsiFault {
  pnicDevice: string;
}