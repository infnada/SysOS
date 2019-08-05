import {NotEnoughLicenses} from './not-enough-licenses';
import {Int} from './int';

export interface HostInventoryFull extends NotEnoughLicenses {
  capacity: Int;
}
