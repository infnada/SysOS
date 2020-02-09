import {DynamicData} from './dynamic-data';

import {ApplyProfile} from './apply-profile';

export interface ProfileApplyProfileProperty extends DynamicData {
  array: boolean;
  profile?: ApplyProfile[];
  propertyName: string;
}