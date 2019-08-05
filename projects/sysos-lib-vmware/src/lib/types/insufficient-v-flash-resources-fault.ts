import {InsufficientResourcesFault} from './insufficient-resources-fault';
import {Long} from './long';

export interface InsufficientVFlashResourcesFault extends InsufficientResourcesFault {
  freeSpace: Long;
  freeSpaceInMB?: Long;
  requestedSpace: Long;
  requestedSpaceInMB?: Long;
}
