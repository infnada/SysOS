import {Injectable} from '@angular/core';

interface Workspace {
  uuid: string;
  name: string;
}

// TODO
@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibWorkspaceService {

  private currentWorkspaceUuid: string;

  constructor() {
  }

  async loadWorkspaces(): Promise<void> {

    const workspaces: Workspace[] = [
      {
        uuid: 'someWorkspaceUuid',
        name: 'default'
      }
    ];

    const defaultWorkspaceUuid: Workspace = workspaces.find((workspace: Workspace) => {
      return workspace.name === 'default';
    });

    this.changeWorkspace(defaultWorkspaceUuid.uuid);
  }

  changeWorkspace(workspaceUuid: string): void {
    this.currentWorkspaceUuid = workspaceUuid;
  }

  getCurrentWorkspaceUuid(): string {
    return this.currentWorkspaceUuid;
  }

}
