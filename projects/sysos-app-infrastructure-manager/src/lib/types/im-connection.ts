export interface ImConnection {
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
