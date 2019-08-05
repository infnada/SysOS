import {DynamicData} from './dynamic-data';

import {GuestRegValueDataSpec} from './guest-reg-value-data-spec';
import {GuestRegValueNameSpec} from './guest-reg-value-name-spec';
export interface GuestRegValueSpec extends DynamicData {
  data: GuestRegValueDataSpec;
  name: GuestRegValueNameSpec;
}
