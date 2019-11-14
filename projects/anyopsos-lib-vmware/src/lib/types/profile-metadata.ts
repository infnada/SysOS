import {DynamicData} from './dynamic-data';

import {ExtendedDescription} from './extended-description';
import {ProfileMetadataProfileOperationMessage} from './profile-metadata-profile-operation-message';
import {ProfileMetadataProfileSortSpec} from './profile-metadata-profile-sort-spec';
export interface ProfileMetadata extends DynamicData {
  description?: ExtendedDescription;
  key?: ProfileMetadataProfileOperationMessage[];
  profileCategory?: string;
  profileComponent?: string;
  profileTypeName?: string;
  sortSpec?: ProfileMetadataProfileSortSpec[];
}
