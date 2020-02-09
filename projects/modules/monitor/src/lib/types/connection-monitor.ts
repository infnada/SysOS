// TODO
// import {VMWareObject} from "../../../../../../dist/applications/infrastructure-manager";

import {MonitorConnectionTypes} from './monitor-connection-types';

export interface ConnectionMonitor {
  uuid: string;
  host: string;
  port: number;
  description: string;
  credential: string;
  withCredential: boolean;
  linkTo: any; // TODO
  autologin: boolean;
  save: boolean;
  state: string;
  type: MonitorConnectionTypes;
  error?: string;
  snapshotData?: any;
}
