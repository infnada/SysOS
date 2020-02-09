import {DvsFault} from './dvs-fault';


export interface VspanPromiscuousPortNotSupported extends DvsFault {
  portKey: string;
  vspanSessionKey: string;
}