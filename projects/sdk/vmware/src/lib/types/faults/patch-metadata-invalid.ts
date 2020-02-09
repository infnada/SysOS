import {VimFault} from './vim-fault';


export interface PatchMetadataInvalid extends VimFault {
  metaData?: string[];
  patchID: string;
}