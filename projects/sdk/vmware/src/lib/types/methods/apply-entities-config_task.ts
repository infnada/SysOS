import {ManagedObjectReference} from '../data/managed-object-reference';
import {ApplyHostProfileConfigurationSpec} from '../data/apply-host-profile-configuration-spec';


export interface ApplyEntitiesConfig_Task {
  _this: ManagedObjectReference;
  applyConfigSpecs?: ApplyHostProfileConfigurationSpec[];
}