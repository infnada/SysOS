import {Client} from 'ssh2';

export interface WorkspaceToSshMap {
  [key: string]: {
    [key: string]: Client;
  };
}
