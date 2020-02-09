import {join} from 'path';

import {AnyOpsOSGetPathModule} from '@anyopsos/module-get-path';

// TODO
export class AnyOpsOSWorkspaceModule {

  private readonly GetPathModule: AnyOpsOSGetPathModule;

  constructor(private readonly userUuid: string,
              private readonly sessionUuid: string) {

    this.GetPathModule = new AnyOpsOSGetPathModule();
  }

  getDefaultWorkspaceUuid(): string {
    return 'someWorkspaceUuid';
  }

  getWorkspacePath(workspaceUuid: string): string {
    return join(this.GetPathModule.filesystem, '/home/root/Workspaces/default');
  }

  getWorkspaceConfigPath(workspaceUuid: string): string {
    return join(this.GetPathModule.filesystem, '/home/root/Workspaces/default/etc');
  }

}
