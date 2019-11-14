import {DynamicData} from './dynamic-data';

export interface VsanClusterConfigInfoHostDefaultInfo extends DynamicData {
  autoClaimStorage?: boolean;
  checksumEnabled?: boolean;
  uuid?: string;
}
