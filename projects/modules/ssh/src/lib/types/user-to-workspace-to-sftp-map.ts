import {AsyncSFTPWrapper} from './async-sftp-wrapper';

export interface UserToWorkspaceToSftpMap {
  [key: string]: {
    [key: string]: {
      [key: string]: AsyncSFTPWrapper;
    };
  };
}
