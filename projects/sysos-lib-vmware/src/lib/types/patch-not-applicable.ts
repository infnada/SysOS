import {VimFault} from './vim-fault';

export interface PatchNotApplicable extends VimFault {
  patchID: string;
}
