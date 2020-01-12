import {DynamicData} from './dynamic-data';
import {Int} from './int';
import {Long} from './long';

export interface NvdimmNamespaceInfo extends DynamicData {
  blockCount: Long;
  blockSize: Long;
  friendlyName: string;
  locationID: Int;
  namespaceHealthStatus: string;
  state: string;
  type: string;
  uuid: string;
}
