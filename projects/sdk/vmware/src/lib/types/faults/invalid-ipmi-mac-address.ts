import {VimFault} from './vim-fault';


export interface InvalidIpmiMacAddress extends VimFault {
  observedMacAddress: string;
  userProvidedMacAddress: string;
}