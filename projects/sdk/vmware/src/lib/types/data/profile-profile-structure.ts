import {DynamicData} from './dynamic-data';

import {ProfileProfileStructureProperty} from './profile-profile-structure-property';

export interface ProfileProfileStructure extends DynamicData {
  child?: ProfileProfileStructureProperty[];
  profileTypeName: string;
}