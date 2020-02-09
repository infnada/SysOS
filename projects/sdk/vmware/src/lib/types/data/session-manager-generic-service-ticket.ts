import {DynamicData} from './dynamic-data';


export interface SessionManagerGenericServiceTicket extends DynamicData {
  hostName?: string;
  id: string;
  sslThumbprint?: string;
}