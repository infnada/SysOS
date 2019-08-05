import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
export interface ServiceManagerServiceInfo extends DynamicData {
  description: string;
  location?: string[];
  service: ManagedObjectReference;
  serviceName: string;
}
