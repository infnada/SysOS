import {DataObject} from '@anyopsos/backend-core/app/types/data-object';

export interface ConfigFileData {
  uuid: string;
  data?: {
    Data: DataObject[]
  }
  [key: string]: any;
}
