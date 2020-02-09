import {VimFault} from './vim-fault';


export interface HttpFault extends VimFault {
  statusCode: number;
  statusMessage: string;
}