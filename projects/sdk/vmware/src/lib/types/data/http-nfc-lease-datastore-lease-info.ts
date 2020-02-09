import {DynamicData} from './dynamic-data';

import {HttpNfcLeaseHostInfo} from './http-nfc-lease-host-info';

export interface HttpNfcLeaseDatastoreLeaseInfo extends DynamicData {
  datastoreKey: string;
  hosts: HttpNfcLeaseHostInfo[];
}