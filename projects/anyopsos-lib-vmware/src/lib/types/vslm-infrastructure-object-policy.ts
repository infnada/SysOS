import {DynamicData} from './dynamic-data';

import {LocalizedMethodFault} from './localized-method-fault';
export interface VslmInfrastructureObjectPolicy extends DynamicData {
  backingObjectId?: LocalizedMethodFault;
  name: string;
  profileId: string;
}
