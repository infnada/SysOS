import {DynamicData} from './dynamic-data';
import {Byte} from './byte';

export interface HostTpmEventDetails extends DynamicData {
  dataHash: Byte[];
  dataHashMethod?: string;
}
