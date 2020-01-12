import {ensureDir, pathExists} from 'fs-extra';
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
      ensureDir(join(__dirname, '/filesystem/etc/applications')),
      ensureDir(join(__dirname, '/filesystem/etc/desktop')),
      ensureDir(join(__dirname, '/filesystem/mnt'))
    ]).then(() => {}).catch((e) => {
      console.log(e);
    });
  }

  /**
   * Checks and creates if required all Home folders
   */
  private checkHomeFolders(): Promise<void> {
    return Promise.all([
      ensureDir(join(__dirname, '/filesystem/home/root/Desktop')),
      ensureDir(join(__dirname, '/filesystem/home/root/Documents')),
      ensureDir(join(__dirname, '/filesystem/home/root/Downloads'))
    ]).then(() => {}).catch((e) => {
      console.log(e);
    });
  }

  /**
   * Checks and creates if required all Credentials databases
   */
  private async checkCredentials(): Promise<void> {
    const mainCredentials = await pathExists(join(__dirname, '/filesystem/home/root/credentials.kdbx'));
    if (mainCredentials) return;

    // @ts-ignore TODO
    // Creade new credentials database
    const users: User[] = await new AnyOpsOSConfigFileModule().get(new AnyOpsOSGetPathModule().shadow);
    const user: User = users.find((user: User) => user.username === 'root');
    return new AnyOpsOSCredentialModule().createNewDb(user.uuid, 'root');
  }

  /**
   * Main function that launch all system checks
   */
  public async initialize(): Promise<void> {
    return Promise.all([
      this.checkSystemFolders(),
      this.checkHomeFolders(),
      this.checkCredentials()
    ]).then(() => {}).catch((e) => {
      console.log(e);
    });
  }
}
