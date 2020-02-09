import {DynamicData} from './dynamic-data';

import {HostSnmpAgentCapability} from '../enums/host-snmp-agent-capability';

export interface HostSnmpSystemAgentLimits extends DynamicData {
  capability: HostSnmpAgentCapability;
  maxBufferSize: number;
  maxCommunityLength: number;
  maxReadOnlyCommunities: number;
  maxTrapDestinations: number;
}