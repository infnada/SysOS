import {DynamicData} from './dynamic-data';

import {LocalizedMethodFault} from './localized-method-fault';
import {GuestRegKeySpec} from './guest-reg-key-spec';

export interface GuestRegKeyRecordSpec extends DynamicData {
  fault?: LocalizedMethodFault;
  key: GuestRegKeySpec;
}