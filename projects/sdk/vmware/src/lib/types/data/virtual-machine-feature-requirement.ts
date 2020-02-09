import {DynamicData} from './dynamic-data';


export interface VirtualMachineFeatureRequirement extends DynamicData {
  featureName: string;
  key: string;
  value: string;
}