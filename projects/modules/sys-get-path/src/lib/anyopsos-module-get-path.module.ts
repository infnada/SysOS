import {join, dirname} from 'path';

import {AOO_ANYOPSOS_TYPE} from '@anyopsos/module-sys-constants';

export class AnyOpsOSSysGetPathModule {

  // @ts-ignore TODO
  private anyOpsOSPath: string = AOO_ANYOPSOS_TYPE === 'filesystem' ? dirname(require.main.filename) : join(dirname(require.main.filename), '../');

  constructor() {
  }

  get filesystem(): string {
    return join(this.anyOpsOSPath, './filesystem/');
  }

  get etc(): string {
    return join(this.anyOpsOSPath, '/filesystem/etc/');
  }

  get shadow(): string {
    return 'shadow.json';
  }

}
