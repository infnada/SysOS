import {InsufficientResourcesFault} from './insufficient-resources-fault';


export interface InsufficientVFlashResourcesFault extends InsufficientResourcesFault {
  freeSpace: number;
  freeSpaceInMB?: number;
  requestedSpace: number;
  requestedSpaceInMB?: number;
}