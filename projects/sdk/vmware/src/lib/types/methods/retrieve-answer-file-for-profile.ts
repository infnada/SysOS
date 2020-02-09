import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostApplyProfile} from '../data/host-apply-profile';


export interface RetrieveAnswerFileForProfile {
  _this: ManagedObjectReference;
  host: ManagedObjectReference & { $type: 'HostSystem'; };
  applyProfile: HostApplyProfile;
}