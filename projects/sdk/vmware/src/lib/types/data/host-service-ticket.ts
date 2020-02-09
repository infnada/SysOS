import {DynamicData} from './dynamic-data';


export interface HostServiceTicket extends DynamicData {
  host?: string;
  port?: number;
  service: string;
  serviceVersion: string;
  sessionId: string;
  sslThumbprint?: string;
}