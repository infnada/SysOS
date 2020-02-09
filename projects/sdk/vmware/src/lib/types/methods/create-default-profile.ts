import {ManagedObjectReference} from '../data/managed-object-reference';


export interface CreateDefaultProfile {
  _this: ManagedObjectReference;
  profileType: string;
  profileTypeName?: string;
  profile?: ManagedObjectReference & { $type: 'Profile'; };
}