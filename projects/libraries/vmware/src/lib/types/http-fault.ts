import {VimFault} from './vim-fault';
import {Int} from './int';

export interface HttpFault extends VimFault {
  statusCode: Int;
  statusMessage: string;
}
