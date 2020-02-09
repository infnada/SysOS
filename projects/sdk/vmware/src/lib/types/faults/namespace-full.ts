import {VimFault} from './vim-fault';


export interface NamespaceFull extends VimFault {
  currentMaxSize: number;
  name: string;
  requiredSize?: number;
}