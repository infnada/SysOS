import {ManagedObjectReference} from '../data/managed-object-reference';


export interface QueryPolicyMetadata {
  _this: ManagedObjectReference;
  policyName?: string[];
  profile?: ManagedObjectReference & { $type: 'Profile'; };
}