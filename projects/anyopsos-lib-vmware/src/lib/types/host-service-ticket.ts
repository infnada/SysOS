import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface HostServiceTicket extends DynamicData {
  host?: string;
  port?: Int;
  service: string;
  serviceVersion: string;
  sessionId: string;
  sslThumbprint?: string;
}
