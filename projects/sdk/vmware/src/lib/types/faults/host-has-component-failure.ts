import {VimFault} from './vim-fault';


export interface HostHasComponentFailure extends VimFault {
  componentName: string;
  componentType: string;
  hostName: string;
}