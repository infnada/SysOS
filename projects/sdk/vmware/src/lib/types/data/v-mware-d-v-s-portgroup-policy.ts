import {DVPortgroupPolicy} from './d-v-portgroup-policy';


export interface VMwareDVSPortgroupPolicy extends DVPortgroupPolicy {
  ipfixOverrideAllowed?: boolean;
  macManagementOverrideAllowed?: boolean;
  securityPolicyOverrideAllowed: boolean;
  uplinkTeamingOverrideAllowed: boolean;
  vlanOverrideAllowed: boolean;
}