
import {ManagedObjectReference} from './managed-object-reference';

export interface ServiceManagerServiceInfo {
  description: string;
  location?
        : string[];
  service: ManagedObjectReference;
  serviceName: string;
}