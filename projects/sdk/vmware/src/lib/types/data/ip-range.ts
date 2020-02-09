import {IpAddress} from './ip-address';


export interface IpRange extends IpAddress {
  addressPrefix: string;
  prefixLength?: number;
}