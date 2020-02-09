import {VimFault} from './vim-fault';


export interface InaccessibleVFlashSource extends VimFault {
  hostName: string;
}