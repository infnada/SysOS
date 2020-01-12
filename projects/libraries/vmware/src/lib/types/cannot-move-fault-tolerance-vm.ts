import {VimFault} from './vim-fault';

export interface CannotMoveFaultToleranceVm extends VimFault {
  moveType: string;
  vmName: string;
}
