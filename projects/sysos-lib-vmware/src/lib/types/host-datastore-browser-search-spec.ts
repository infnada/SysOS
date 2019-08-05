import {DynamicData} from './dynamic-data';

import {FileQueryFlags} from './file-query-flags';
import {FileQuery} from './file-query';
export interface HostDatastoreBrowserSearchSpec extends DynamicData {
  details?: FileQueryFlags;
  matchPattern?: string[];
  query?: FileQuery[];
  searchCaseInsensitive?: boolean;
  sortFoldersFirst?: boolean;
}
