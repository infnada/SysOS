import {DynamicData} from './dynamic-data';

import {LocalizedMethodFault} from './localized-method-fault';
export interface IscsiStatus extends DynamicData {
  reason?: LocalizedMethodFault[];
}
