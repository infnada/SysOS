import {ManagedObjectReference} from '../data/managed-object-reference';
import {ProfileCreateSpec} from '../data/profile-create-spec';


export interface CreateProfile {
  _this: ManagedObjectReference;
  createSpec: ProfileCreateSpec;
}