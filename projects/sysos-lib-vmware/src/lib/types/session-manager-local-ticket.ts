import {DynamicData} from './dynamic-data';

export interface SessionManagerLocalTicket extends DynamicData {
  passwordFilePath: string;
  userName: string;
}
