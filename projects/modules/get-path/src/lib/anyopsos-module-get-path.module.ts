import {join} from 'path';

export class AnyOpsOSGetPathModule {

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
    return join(this.anyOpsOSPath, '/filesystem/etc/config.json');
  }

  get shadow(): string {
    return join(this.anyOpsOSPath, '/filesystem/etc/shadow.json');
  }

}
