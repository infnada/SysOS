import {FileQuery} from './file-query';

import {VmConfigFileQueryFlags} from './vm-config-file-query-flags';
import {VmConfigFileQueryFilter} from './vm-config-file-query-filter';
export interface VmConfigFileQuery extends FileQuery {
  details?: VmConfigFileQueryFlags;
  filter?: VmConfigFileQueryFilter;
}
