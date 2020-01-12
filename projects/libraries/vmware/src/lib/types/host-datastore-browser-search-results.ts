import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
import {FileInfo} from './file-info';
export interface HostDatastoreBrowserSearchResults extends DynamicData {
  datastore?: ManagedObjectReference & { $type: 'Datastore' };
  file?: FileInfo[];
  folderPath?: string;
}
