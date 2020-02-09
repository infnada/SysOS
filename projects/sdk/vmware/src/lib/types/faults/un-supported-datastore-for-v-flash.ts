import {UnsupportedDatastore} from './unsupported-datastore';


export interface UnSupportedDatastoreForVFlash extends UnsupportedDatastore {
  datastoreName: string;
  type: string;
}