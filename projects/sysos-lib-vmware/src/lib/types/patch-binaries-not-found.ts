import {VimFault} from './vim-fault';

export interface PatchBinariesNotFound extends VimFault {
  binary?: string[];
  patchID: string;
}
