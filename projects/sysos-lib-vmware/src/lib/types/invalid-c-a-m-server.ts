import {ActiveDirectoryFault} from './active-directory-fault';

export interface InvalidCAMServer extends ActiveDirectoryFault {
  camServer: string;
}
