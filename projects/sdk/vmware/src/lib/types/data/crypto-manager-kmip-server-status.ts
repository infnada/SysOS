import {DynamicData} from './dynamic-data';

import {CryptoManagerKmipCertificateInfo} from './crypto-manager-kmip-certificate-info';
import {ManagedEntityStatus} from '../enums/managed-entity-status';

export interface CryptoManagerKmipServerStatus extends DynamicData {
  certInfo?: CryptoManagerKmipCertificateInfo;
  clientTrustServer?: boolean;
  connectionStatus: string;
  name: string;
  serverTrustClient?: boolean;
  status: ManagedEntityStatus;
}