import {DynamicData} from './dynamic-data';


export interface EventFilterSpecByUsername extends DynamicData {
  systemUser: boolean;
  userList?: string[];
}