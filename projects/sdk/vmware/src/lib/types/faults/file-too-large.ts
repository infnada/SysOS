import {FileFault} from './file-fault';


export interface FileTooLarge extends FileFault {
  datastore: string;
  fileSize: number;
  maxFileSize?: number;
}