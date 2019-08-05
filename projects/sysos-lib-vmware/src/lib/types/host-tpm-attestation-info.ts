import {DynamicData} from './dynamic-data';

import {LocalizableMessage} from './localizable-message';
import {HostTpmAttestationInfoAcceptanceStatus} from './host-tpm-attestation-info-acceptance-status';
import {DateTime} from './date-time';
export interface HostTpmAttestationInfo extends DynamicData {
  message?: LocalizableMessage;
  status: HostTpmAttestationInfoAcceptanceStatus;
  time: DateTime;
}
