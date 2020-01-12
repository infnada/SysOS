import {Request} from 'request';

export interface UserToSessionLogsMap {
  [key: string]: {
    [key: string]: {
      terminalUuid: string;
      logUuid: string;
      request: Request;
    }[]
  };
}
