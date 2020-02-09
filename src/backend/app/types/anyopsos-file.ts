import {Stats} from 'fs-extra';

export interface AnyOpsOSFile {
  fileName: string;
  longName: string;
  attrs: Stats | null;
}
