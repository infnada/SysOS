import {DynamicData} from './dynamic-data';

import {HostConfigSummary} from './host-config-summary';
import {CustomFieldValue} from './custom-field-value';
import {HostListSummaryGatewaySummary} from './host-list-summary-gateway-summary';
import {HostHardwareSummary} from './host-hardware-summary';
import {ManagedObjectReference} from './managed-object-reference';
import {ManagedEntityStatus} from './managed-entity-status';
import {HostListSummaryQuickStats} from './host-list-summary-quick-stats';
import {HostRuntimeInfo} from './host-runtime-info';
import {HostTpmAttestationInfo} from './host-tpm-attestation-info';
export interface HostListSummary extends DynamicData {
  config: HostConfigSummary;
  currentEVCModeKey?: string;
  customValue?: CustomFieldValue[];
  gateway?: HostListSummaryGatewaySummary;
  hardware?: HostHardwareSummary;
  host?: ManagedObjectReference & { $type: 'HostSystem' };
  managementServerIp?: string;
  maxEVCModeKey?: string;
  overallStatus: ManagedEntityStatus;
  quickStats: HostListSummaryQuickStats;
  rebootRequired: boolean;
  runtime?: HostRuntimeInfo;
  tpmAttestation?: HostTpmAttestationInfo;
}
