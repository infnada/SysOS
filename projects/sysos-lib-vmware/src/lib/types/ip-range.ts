import {IpAddress} from './ip-address';
import {Int} from './int';

export interface IpRange extends IpAddress {
  addressPrefix: string;
  prefixLength?: Int;
}
