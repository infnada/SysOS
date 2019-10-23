export interface Netdata {
  uuid: string;
  url: string;
  description: string;
  credential: string;
  withCredential: boolean;
  autologin: boolean;
  save: boolean;
  state: string;
  type: 'netdata' | 'netdata-credential' | 'snapshot' | 'internal';
  error?: string;
  snapshotData?: any;
}
