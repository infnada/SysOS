import {DynamicData} from './dynamic-data';

import {HostSystemIdentificationInfo} from './host-system-identification-info';

export interface HostSystemInfo extends DynamicData {
  model: string;
  otherIdentifyingInfo?: HostSystemIdentificationInfo[];
  serialNumber?: string;
  uuid: string;
  vendor: string;
}