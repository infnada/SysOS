import {FileFault} from './file-fault';
import {Long} from './long';

export interface FileTooLarge extends FileFault {
  datastore: string;
  fileSize: Long;
  maxFileSize?: Long;
}
