import {join} from 'path';

import {AnyOpsOSSysGetPathModule} from '@anyopsos/module-sys-get-path';

// TODO
export class AnyOpsOSSysWorkspaceModule {

  private readonly GetPathModule: AnyOpsOSSysGetPathModule;

  constructor(private readonly userUuid: string,
              private readonly sessionUuid: string) {

    this.GetPathModule = new AnyOpsOSSysGetPathModule();
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
