import {IscsiFault} from './iscsi-fault';

export interface IscsiFaultVnicIsLastPath extends IscsiFault {
  vnicDevice: string;
}
