import {VirtualDeviceDeviceBackingInfo} from './virtual-device-device-backing-info';

import {ManagedObjectReference} from './managed-object-reference';

export interface VirtualEthernetCardNetworkBackingInfo extends VirtualDeviceDeviceBackingInfo {
  inPassthroughMode?: boolean;
  network?: ManagedObjectReference & { $type: 'Network'; };
}