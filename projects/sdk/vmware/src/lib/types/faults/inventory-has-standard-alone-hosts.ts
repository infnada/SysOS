import {NotEnoughLicenses} from './not-enough-licenses';


export interface InventoryHasStandardAloneHosts extends NotEnoughLicenses {
  hosts: string[];
}