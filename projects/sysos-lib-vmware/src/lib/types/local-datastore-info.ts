import {DatastoreInfo} from './datastore-info';

export interface LocalDatastoreInfo extends DatastoreInfo {
  path?: string;
}
