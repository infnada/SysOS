import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
import {HostProtocolEndpoint} from './host-protocol-endpoint';
export interface VVolHostPE extends DynamicData {
  key: ManagedObjectReference & { $type: 'HostSystem' };
  protocolEndpoint: HostProtocolEndpoint[];
}
