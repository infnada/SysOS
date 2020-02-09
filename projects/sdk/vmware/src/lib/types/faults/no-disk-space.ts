import {FileFault} from './file-fault';


export interface NoDiskSpace extends FileFault {
  datastore: string;
}