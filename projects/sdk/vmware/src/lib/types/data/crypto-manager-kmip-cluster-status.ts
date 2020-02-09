import {DynamicData} from './dynamic-data';

import {CryptoManagerKmipCertificateInfo} from './crypto-manager-kmip-certificate-info';
import {KeyProviderId} from './key-provider-id';
import {CryptoManagerKmipServerStatus} from './crypto-manager-kmip-server-status';

export interface CryptoManagerKmipClusterStatus extends DynamicData {
  clientCertInfo?: CryptoManagerKmipCertificateInfo;
  clusterId: KeyProviderId;
  servers: CryptoManagerKmipServerStatus[];
}