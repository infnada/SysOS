import {DynamicData} from './dynamic-data';

export interface HostVMotionConfig extends DynamicData {
  enabled: boolean;
  vmotionNicKey?: string;
}
