import {ManagedObjectReference} from '../data/managed-object-reference';


export interface QueryCompatibleHostForExistingDvs {
  _this: ManagedObjectReference;
  container: ManagedObjectReference & { $type: 'ManagedEntity'; };
  recursive: boolean;
  dvs: ManagedObjectReference & { $type: 'DistributedVirtualSwitch'; };
}