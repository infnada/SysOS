import {Terminal} from './terminal';

export interface UserToSessionToTerminalMap {
  [key: string]: {
    [key: string]: {
      [key: string]: Terminal;
    };
  };
}
