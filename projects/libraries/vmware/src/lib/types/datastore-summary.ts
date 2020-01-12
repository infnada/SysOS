import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
import {Long} from './long';
export interface DatastoreSummary extends DynamicData {
  accessible: boolean;
  capacity: Long;
  datastore?: ManagedObjectReference & { $type: 'Datastore' };
  freeSpace: Long;
  maintenanceMode?: string;
  multipleHostAccess?: boolean;
  name: string;
  type: string;
  uncommitted?: Long;
  url: string;
}
