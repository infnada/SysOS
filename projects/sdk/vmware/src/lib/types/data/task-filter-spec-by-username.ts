import {DynamicData} from './dynamic-data';


export interface TaskFilterSpecByUsername extends DynamicData {
  systemUser: boolean;
  userList?: string[];
}