import {ManagedObjectReference} from '../data/managed-object-reference';


export interface ResolveInstallationErrorsOnHost_Task {
  _this: ManagedObjectReference;
  filterId: string;
  host: ManagedObjectReference & { $type: 'HostSystem'; };
}