import {VimFault} from './vim-fault';


export interface InvalidLicense extends VimFault {
  licenseContent: string;
}