import {DynamicData} from './dynamic-data';

import {ProfileDescriptionSection} from './profile-description-section';
export interface ProfileDescription extends DynamicData {
  section: ProfileDescriptionSection[];
}
