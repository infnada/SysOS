import {DynamicData} from './dynamic-data';

export interface HostFeatureMask extends DynamicData {
  featureName: string;
  key: string;
  value: string;
}
