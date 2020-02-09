import {DynamicData} from './dynamic-data';

import {LocalizableMessage} from './localizable-message';
import {HostTpmAttestationInfoAcceptanceStatus} from '../enums/host-tpm-attestation-info-acceptance-status';

export interface HostTpmAttestationInfo extends DynamicData {
  message?: LocalizableMessage;
  status: HostTpmAttestationInfoAcceptanceStatus;
  time: string;
}