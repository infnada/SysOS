import {GuestRegValueDataSpec} from './guest-reg-value-data-spec';
import {Int} from './int';

export interface GuestRegValueDwordSpec extends GuestRegValueDataSpec {
  value: Int;
}
