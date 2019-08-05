import {VimFault} from './vim-fault';

export interface LicenseEntityNotFound extends VimFault {
  entityId: string;
}
