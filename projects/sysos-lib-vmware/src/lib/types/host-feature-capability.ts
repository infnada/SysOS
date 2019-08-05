import {DynamicData} from './dynamic-data';

export interface HostFeatureCapability extends DynamicData {
  featureName: string;
  key: string;
  value: string;
}
