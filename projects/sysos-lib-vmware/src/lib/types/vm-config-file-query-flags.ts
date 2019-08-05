import {DynamicData} from './dynamic-data';

export interface VmConfigFileQueryFlags extends DynamicData {
  configVersion: boolean;
  encryption?: boolean;
}
