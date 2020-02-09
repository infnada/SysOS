import {ManagedObjectReference} from '../data/managed-object-reference';


export interface DisableFeature {
  _this: ManagedObjectReference;
  host?: ManagedObjectReference & { $type: 'HostSystem'; };
  featureKey: string;
}