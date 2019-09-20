export interface Netdata {
  uuid: string;
  url: string;
  description: string;
  credential: string;
  autologin: boolean;
  save: boolean;
  state: string;
  type: string;
  error?: string;
}
