import {DynamicData} from './dynamic-data';

export interface PrivilegeAvailability extends DynamicData {
  isGranted: boolean;
  privId: string;
}
