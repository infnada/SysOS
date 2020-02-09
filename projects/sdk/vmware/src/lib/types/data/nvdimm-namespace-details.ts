import {DynamicData} from './dynamic-data';


export interface NvdimmNamespaceDetails extends DynamicData {
  friendlyName: string;
  interleavesetID: number;
  namespaceHealthStatus: string;
  size: number;
  state: string;
  type: string;
  uuid: string;
}