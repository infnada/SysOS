import {DynamicData} from './dynamic-data';

import {GuestRegKeyNameSpec} from './guest-reg-key-name-spec';

export interface GuestRegKeySpec extends DynamicData {
  classType: string;
  keyName: GuestRegKeyNameSpec;
  lastWritten: string;
}