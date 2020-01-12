// TODO
// import {VMWareObject} from "../../../../../../dist/applications/infrastructure-manager";

import {MonitorConnectionTypes} from './monitor-connection-types';

export interface MonitorConnection {
  uuid: string;
  url: string;
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
