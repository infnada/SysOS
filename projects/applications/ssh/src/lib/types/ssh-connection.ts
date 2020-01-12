export interface SshConnection {
  uuid: string;
  description: string;
  host: string;
  port: number;
  credential: string;
  hopServerUuid: string;
  autologin: boolean;
  save: boolean;
  state: string;
  error?: string;
}
