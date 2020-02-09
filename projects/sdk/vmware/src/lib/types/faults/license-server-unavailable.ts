import {VimFault} from './vim-fault';


export interface LicenseServerUnavailable extends VimFault {
  licenseServer: string;
}