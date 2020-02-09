import {DynamicData} from './dynamic-data';


export interface NvdimmNamespaceInfo extends DynamicData {
  blockCount: number;
  blockSize: number;
  friendlyName: string;
  locationID: number;
  namespaceHealthStatus: string;
  state: string;
  type: string;
  uuid: string;
}