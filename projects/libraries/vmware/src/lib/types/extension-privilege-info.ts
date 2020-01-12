import {DynamicData} from './dynamic-data';

export interface ExtensionPrivilegeInfo extends DynamicData {
  privGroupName: string;
  privID: string;
}
