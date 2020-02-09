import {ManagedObjectReference} from '../data/managed-object-reference';


export interface QueryConnectionInfo {
  _this: ManagedObjectReference;
  hostname: string;
  port: number;
  username: string;
  password: string;
  sslThumbprint?: string;
}