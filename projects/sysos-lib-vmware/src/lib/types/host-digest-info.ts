import {DynamicData} from './dynamic-data';
import {Byte} from './byte';

export interface HostDigestInfo extends DynamicData {
  digestMethod: string;
  digestValue: Byte[];
  objectName?: string;
}
