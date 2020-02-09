import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostDatastoreBrowserSearchSpec} from '../data/host-datastore-browser-search-spec';


export interface SearchDatastoreSubFolders_Task {
  _this: ManagedObjectReference;
  datastorePath: string;
  searchSpec?: HostDatastoreBrowserSearchSpec;
}