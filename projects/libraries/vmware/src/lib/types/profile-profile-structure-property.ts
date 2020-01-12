import {DynamicData} from './dynamic-data';

import {ProfileProfileStructure} from './profile-profile-structure';
export interface ProfileProfileStructureProperty extends DynamicData {
  array: boolean;
  element: ProfileProfileStructure;
  propertyName: string;
}
