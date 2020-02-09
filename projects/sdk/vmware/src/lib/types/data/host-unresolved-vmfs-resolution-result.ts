import {DynamicData} from './dynamic-data';

import {LocalizedMethodFault} from './localized-method-fault';
import {HostUnresolvedVmfsResolutionSpec} from './host-unresolved-vmfs-resolution-spec';
import {HostVmfsVolume} from './host-vmfs-volume';

export interface HostUnresolvedVmfsResolutionResult extends DynamicData {
  fault?: LocalizedMethodFault;
  spec: HostUnresolvedVmfsResolutionSpec;
  vmfs?: HostVmfsVolume;
}