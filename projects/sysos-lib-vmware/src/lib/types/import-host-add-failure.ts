import {DvsFault} from './dvs-fault';

export interface ImportHostAddFailure extends DvsFault {
  hostIp: string[];
}
