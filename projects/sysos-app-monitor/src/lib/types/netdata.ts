export interface Netdata {
  uuid: string;
  url: string;
  description: string;
  credential: string;
  credentialBtoa?: string;
  autologin: boolean;
  save: boolean;
  state: string;
  type: string;
  error?: string;
  snapshotData?: any;
}
