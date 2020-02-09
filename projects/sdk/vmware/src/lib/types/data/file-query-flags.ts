import {DynamicData} from './dynamic-data';


export interface FileQueryFlags extends DynamicData {
  fileOwner: boolean;
  fileSize: boolean;
  fileType: boolean;
  modification: boolean;
}