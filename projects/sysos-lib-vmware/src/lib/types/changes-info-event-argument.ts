import {DynamicData} from './dynamic-data';

export interface ChangesInfoEventArgument extends DynamicData {
  added?: string;
  deleted?: string;
  modified?: string;
}
