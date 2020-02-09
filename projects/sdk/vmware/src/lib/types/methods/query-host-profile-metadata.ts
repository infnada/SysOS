import {ManagedObjectReference} from '../data/managed-object-reference';


export interface QueryHostProfileMetadata {
  _this: ManagedObjectReference;
  profileName?: string[];
  profile?: ManagedObjectReference & { $type: 'Profile'; };
}