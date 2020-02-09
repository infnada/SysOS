import {VimFault} from './vim-fault';


export interface UserNotFound extends VimFault {
  principal: string;
  unresolved: boolean;
}