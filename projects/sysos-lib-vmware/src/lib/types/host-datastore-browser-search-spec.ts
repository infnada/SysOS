import {FileQueryFlags} from "./file-query-flags";
import {FileQuery} from "./file-query";

export interface HostDatastoreBrowserSearchSpec {
  details?: FileQueryFlags;
  matchPattern?: string[];
  query?: FileQuery[];
  searchCaseInsensitive?: boolean;
  sortFoldersFirst?: boolean;
}
