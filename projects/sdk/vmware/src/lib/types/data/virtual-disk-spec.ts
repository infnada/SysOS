import {DynamicData} from './dynamic-data';


export interface VirtualDiskSpec extends DynamicData {
  adapterType: string;
  diskType: string;
}