import {AsyncSFTPWrapper} from './async-sftp-wrapper';

export interface UserToSessionToSftpMap {
  [key: string]: {
    [key: string]: {
      [key: string]: AsyncSFTPWrapper;
    };
  };
}
