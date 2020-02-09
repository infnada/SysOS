import {DynamicData} from './dynamic-data';


export interface NvdimmNamespaceCreateSpec extends DynamicData {
  blockCount: number;
  blockSize: number;
  friendlyName?: string;
  locationID: number;
  type: string;
}