import {InvalidDatastore} from './invalid-datastore';


export interface InvalidDatastorePath extends InvalidDatastore {
  datastorePath: string;
}