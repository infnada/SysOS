import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostProfileManagerHostToConfigSpecMap} from '../data/host-profile-manager-host-to-config-spec-map';


export interface UpdateHostCustomizations_Task {
  _this: ManagedObjectReference;
  hostToConfigSpecMap?: HostProfileManagerHostToConfigSpecMap[];
}