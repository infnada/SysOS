export interface SftpConnection {
  uuid: string;
  description: string;
  host: string;
  port: number;
  credential: string;
  hopping: boolean;
  hophost: string;
  hopport: number;
  hopcredential: string;
  autologin: boolean;
  save: boolean;
  state: string;
  type: string;
  error?: string;
}
