import {GuestRegValueDataSpec} from './guest-reg-value-data-spec';
import {Long} from './long';

export interface GuestRegValueQwordSpec extends GuestRegValueDataSpec {
  value: Long;
}
