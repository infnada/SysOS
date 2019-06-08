export interface SshConnection {
  uuid: string;
  host: string;
  port: number;
  description: string;
  credential: string;
  autologin: boolean;
  save: boolean;
  state: string;
  error?: string;
}
