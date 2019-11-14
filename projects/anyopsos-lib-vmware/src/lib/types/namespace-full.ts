import {VimFault} from './vim-fault';
import {Long} from './long';

export interface NamespaceFull extends VimFault {
  currentMaxSize: Long;
  name: string;
  requiredSize?: Long;
}
