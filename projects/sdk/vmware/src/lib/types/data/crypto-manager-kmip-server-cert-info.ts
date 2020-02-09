import {DynamicData} from './dynamic-data';

import {CryptoManagerKmipCertificateInfo} from './crypto-manager-kmip-certificate-info';

export interface CryptoManagerKmipServerCertInfo extends DynamicData {
  certificate: string;
  certInfo?: CryptoManagerKmipCertificateInfo;
  clientTrustServer?: boolean;
}