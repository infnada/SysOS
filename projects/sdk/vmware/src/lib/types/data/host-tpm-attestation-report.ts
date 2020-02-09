import {DynamicData} from './dynamic-data';

import {HostTpmEventLogEntry} from './host-tpm-event-log-entry';
import {HostTpmDigestInfo} from './host-tpm-digest-info';

export interface HostTpmAttestationReport extends DynamicData {
  tpmEvents: HostTpmEventLogEntry[];
  tpmLogReliable: boolean;
  tpmPcrValues: HostTpmDigestInfo[];
}