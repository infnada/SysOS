import {DynamicData} from './dynamic-data';


export interface HostMountInfo extends DynamicData {
  accessible?: boolean;
  accessMode: string;
  inaccessibleReason?: string;
  mounted?: boolean;
  path?: string;
}