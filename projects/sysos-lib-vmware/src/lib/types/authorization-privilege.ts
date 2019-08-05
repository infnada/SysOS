import {DynamicData} from './dynamic-data';

export interface AuthorizationPrivilege extends DynamicData {
  name: string;
  onParent: boolean;
  privGroupName: string;
  privId: string;
}
