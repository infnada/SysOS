import {DynamicData} from './dynamic-data';
import {Int} from './int';
import {Long} from './long';

export interface NvdimmNamespaceCreateSpec extends DynamicData {
  blockCount: Long;
  blockSize: Long;
  friendlyName?: string;
  locationID: Int;
  type: string;
}
