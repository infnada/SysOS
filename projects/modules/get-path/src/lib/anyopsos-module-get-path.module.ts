import {join} from 'path';

export class AnyOpsOSGetPathModule {

  // @ts-ignore TODO
  private anyOpsOSPath: string = require('path').dirname(require.main.filename);

  constructor() {
  }

  get filesystem(): string {
    return join(this.anyOpsOSPath, './filesystem/');
  }

  get etc(): string {
    return join(this.anyOpsOSPath, '/filesystem/etc/');
  }

  get mainConfig(): string {
    return 'config.json';
  }

  get shadow(): string {
    return 'shadow.json';
  }

}
