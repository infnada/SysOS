import {DynamicData} from './dynamic-data';

export interface PrivilegePolicyDef extends DynamicData {
  createPrivilege: string;
  deletePrivilege: string;
  readPrivilege: string;
  updatePrivilege: string;
}
