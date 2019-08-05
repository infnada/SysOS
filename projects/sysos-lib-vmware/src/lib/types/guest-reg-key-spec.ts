import {DynamicData} from './dynamic-data';

import {GuestRegKeyNameSpec} from './guest-reg-key-name-spec';
import {DateTime} from './date-time';
export interface GuestRegKeySpec extends DynamicData {
  classType: string;
  keyName: GuestRegKeyNameSpec;
  lastWritten: DateTime;
}
