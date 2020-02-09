import {VimFault} from './vim-fault';


export interface ResourceNotAvailable extends VimFault {
  containerName?: string;
  containerType?: string;
  type?: string;
}