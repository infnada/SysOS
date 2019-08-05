import {DvsFault} from './dvs-fault';

export interface DvsNotAuthorized extends DvsFault {
  dvsExtensionKey?: string;
  sessionExtensionKey?: string;
}
