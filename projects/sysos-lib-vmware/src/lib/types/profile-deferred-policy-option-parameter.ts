import {DynamicData} from './dynamic-data';

import {ProfilePropertyPath} from './profile-property-path';
import {KeyAnyValue} from './key-any-value';
export interface ProfileDeferredPolicyOptionParameter extends DynamicData {
  inputPath: ProfilePropertyPath;
  parameter?: KeyAnyValue[];
}
