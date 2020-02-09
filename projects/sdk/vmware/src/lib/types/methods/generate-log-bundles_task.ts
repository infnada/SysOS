import {ManagedObjectReference} from '../data/managed-object-reference';


export interface GenerateLogBundles_Task {
  _this: ManagedObjectReference;
  includeDefault: boolean;
  host?: ManagedObjectReference & { $type: 'HostSystem[]'; };
}