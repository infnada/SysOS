import {DynamicData} from './dynamic-data';


export interface VmfsDatastoreSpec extends DynamicData {
  diskUuid: string;
}