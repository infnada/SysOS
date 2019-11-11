import {VMWareObject} from '@sysos/app-infrastructure-manager';

export interface Netdata {
  uuid: string;
  url: string;
  description: string;
  credential: string;
  withCredential: boolean;
  linkTo: VMWareObject;
  autologin: boolean;
  save: boolean;
  state: string;
  type: 'netdata' | 'netdata-credential' | 'snapshot' | 'internal';
  error?: string;
  snapshotData?: any;
}
