import {SFTPWrapper} from 'ssh2';

export interface AsyncSFTPWrapper extends SFTPWrapper {
  [x: string]: any;
}
