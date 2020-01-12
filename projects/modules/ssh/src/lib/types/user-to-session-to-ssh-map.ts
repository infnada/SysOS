import {Client} from 'ssh2';

export interface UserToSessionToSshMap {
  [key: string]: {
    [key: string]: {
      [key: string]: Client;
    };
  };
}
