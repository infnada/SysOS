import {MacAddress} from './mac-address';


export interface MacRange extends MacAddress {
  address: string;
  mask: string;
}