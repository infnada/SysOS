import {DynamicData} from './dynamic-data';

import {HostSnmpAgentCapability} from './host-snmp-agent-capability';
import {Int} from './int';
export interface HostSnmpSystemAgentLimits extends DynamicData {
  capability: HostSnmpAgentCapability;
  maxBufferSize: Int;
  maxCommunityLength: Int;
  maxReadOnlyCommunities: Int;
  maxTrapDestinations: Int;
}
