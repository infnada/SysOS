import {ManagedObjectReference} from '../data/managed-object-reference';


export interface EnableFeature {
  _this: ManagedObjectReference;
  host?: ManagedObjectReference & { $type: 'HostSystem'; };
  featureKey: string;
}