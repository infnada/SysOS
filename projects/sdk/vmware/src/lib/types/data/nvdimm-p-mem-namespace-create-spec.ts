import {DynamicData} from './dynamic-data';


export interface NvdimmPMemNamespaceCreateSpec extends DynamicData {
  friendlyName?: string;
  interleavesetID: number;
  size: number;
}