import {ensureDir, pathExists, pathExistsSync, writeJSONSync} from 'fs-extra';
import {join} from 'path';

import {AnyOpsOSConfigFileModule} from "@anyopsos/module-config-file";
import {AnyOpsOSGetPathModule} from "@anyopsos/module-get-path";
import {AnyOpsOSCredentialModule, User} from "@anyopsos/module-credential";

export class Init {

  constructor() {
  }

  /**
   * Checks and creates if required all System folders
   */
  private checkSystemFolders(): Promise<void> {
    return Promise.all([
      ensureDir(join(__dirname, '/filesystem/bin/applications')),
      ensureDir(join(__dirname, '/filesystem/bin/libs')),
      ensureDir(join(__dirname, '/filesystem/bin/modals')),
      ensureDir(join(__dirname, '/filesystem/bin/apis')),
      ensureDir(join(__dirname, '/filesystem/bin/modules')),
      ensureDir(join(__dirname, '/filesystem/bin/websockets')),
      ensureDir(join(__dirname, '/filesystem/mnt'))
    ]).then(() => {}).catch((e) => {
      console.log(e);
    });
  }

  /**
   * Checks and creates if required all Home folders
   */
  private async checkHomeFolders(): Promise<void> {
    const users: User[] = await new AnyOpsOSConfigFileModule().get(new AnyOpsOSGetPathModule().shadow) as User[];

    users.forEach((user: User) => {
      return Promise.all([
        ensureDir(join(__dirname, `/filesystem/${user.home}/Desktop`)),
        ensureDir(join(__dirname, `/filesystem/${user.home}/Documents`)),
        ensureDir(join(__dirname, `/filesystem/${user.home}/Downloads`)),
        ensureDir(join(__dirname, `/filesystem/${user.home}/Workspaces/default/etc`))
      ]).then(() => {}).catch((e) => {
        console.log(e);
      });
    });
  }

  /**
   * Checks and creates if required all Home folders
   */
  private async checkHomeFiles(): Promise<void> {
    const users: User[] = await new AnyOpsOSConfigFileModule().get(new AnyOpsOSGetPathModule().shadow) as User[];

    users.forEach((user: User) => {
      const taskBarFile: string = join(__dirname, `/filesystem/${user.home}/Workspaces/default/etc/task_bar.json`);

      if (!pathExistsSync(taskBarFile)) {
        writeJSONSync(taskBarFile, []);
      }
    });
  }

  /**
   * Checks and creates if required all Credentials databases
   */
  private async checkRootCredentials(): Promise<void> {
    const mainCredentials = await pathExists(join(__dirname, '/filesystem/home/root/Workspaces/default/credentials.kdbx'));
    if (mainCredentials) return;

    // Create new credentials database
    const users: User[] = await new AnyOpsOSConfigFileModule().get(new AnyOpsOSGetPathModule().shadow) as User[];
    const user: User | undefined = users.find((user: User) => user.username === 'root');
    if (!user) throw new Error('shadow_resource_error');
    return new AnyOpsOSCredentialModule('4ea13e1b-398b-4a30-99df-28720b026d20', 'something', 'someWorkspaceUuid').createNewDb(user.uuid, 'root');
  }

  /**
   * Main function that launch all system checks
   */
  public async initialize(): Promise<void> {
    return Promise.all([
      this.checkSystemFolders(),
      this.checkHomeFolders(),
      this.checkHomeFiles(),
      this.checkRootCredentials()
    ]).then(() => {}).catch((e) => {
      console.log(e);
    });
  }
}
