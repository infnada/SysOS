export interface IMConnection {
  uuid: string;
  host: string;
  port: number;
  description: string;
  credential: string;
  autologin: boolean;
  type: string;
  community?: string;
  oids?: string;
  save: boolean;
  state: string;
  error?: string;
  data?: any;
}
