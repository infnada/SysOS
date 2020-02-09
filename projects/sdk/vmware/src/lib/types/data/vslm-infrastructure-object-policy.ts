import {DynamicData} from './dynamic-data';

import {LocalizedMethodFault} from './localized-method-fault';

export interface vslmInfrastructureObjectPolicy extends DynamicData {
  backingObjectId: string;
  error?: LocalizedMethodFault;
  name: string;
  profileId: string;
}