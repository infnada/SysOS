import {DynamicData} from './dynamic-data';


export interface FcoeConfigFcoeCapabilities extends DynamicData {
  priorityClass: boolean;
  sourceMacAddress: boolean;
  vlanRange: boolean;
}