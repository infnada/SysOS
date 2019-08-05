import {UnsupportedDatastore} from './unsupported-datastore';

export interface MemoryFileFormatNotSupportedByDatastore extends UnsupportedDatastore {
  datastoreName: string;
  type: string;
}
