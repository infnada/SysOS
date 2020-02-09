import {VimFault} from './vim-fault';


export interface SSPIChallenge extends VimFault {
  base64Token: string;
}