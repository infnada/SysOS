import {VimFault} from './vim-fault';


export interface VmValidateMaxDevice extends VimFault {
  count: number;
  device: string;
  max: number;
}