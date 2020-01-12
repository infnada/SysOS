import {Kdbx} from 'kdbxweb';

export interface UserToSessionToDbMap {
  [key: string]: {
    [key: string]: Kdbx;
  };
}
