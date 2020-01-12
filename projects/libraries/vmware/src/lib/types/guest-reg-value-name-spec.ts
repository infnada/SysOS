import {DynamicData} from './dynamic-data';

import {GuestRegKeyNameSpec} from './guest-reg-key-name-spec';
export interface GuestRegValueNameSpec extends DynamicData {
  keyName: GuestRegKeyNameSpec;
  name: string;
}
