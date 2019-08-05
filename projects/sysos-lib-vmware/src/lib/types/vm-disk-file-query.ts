import {FileQuery} from './file-query';

import {VmDiskFileQueryFlags} from './vm-disk-file-query-flags';
import {VmDiskFileQueryFilter} from './vm-disk-file-query-filter';
export interface VmDiskFileQuery extends FileQuery {
  details?: VmDiskFileQueryFlags;
  filter?: VmDiskFileQueryFilter;
}
