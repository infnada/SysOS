import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';

export interface DatastoreSummary extends DynamicData {
  accessible: boolean;
  capacity: number;
  datastore?: ManagedObjectReference & { $type: 'Datastore'; };
  freeSpace: number;
  maintenanceMode?: string;
  multipleHostAccess?: boolean;
  name: string;
  type: string;
  uncommitted?: number;
  url: string;
}