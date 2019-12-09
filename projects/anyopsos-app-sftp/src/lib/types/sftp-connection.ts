export interface SftpConnection {
  uuid: string;
  description: string;
  host: string;
  port: number;
  credential: string;
  hopServerUuid: string;
  autologin: boolean;
  save: boolean;
  state: 'disconnected' | 'connected' | 'ready';
  error?: string;
}
