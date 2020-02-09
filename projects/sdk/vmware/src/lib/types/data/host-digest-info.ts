import {DynamicData} from './dynamic-data';


export interface HostDigestInfo extends DynamicData {
  digestMethod: string;
  digestValue: number[];
  objectName?: string;
}