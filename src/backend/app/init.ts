import {ensureDir, pathExists} from 'fs-extra';
import * as path from 'path';
import readConfig from 'read-config';

import {CredentialsModule} from "./routes/modules/credentials";

export class Init {

  constructor() {
  }

  /**
   * Checks and creates if required all System folders
   */
  private checkSystemFolders(): Promise<void> {
    return Promise.all([
      ensureDir(path.join(__dirname, '/filesystem/bin/applications')),
      ensureDir(path.join(__dirname, '/filesystem/bin/libs')),
      ensureDir(path.join(__dirname, '/filesystem/bin/modals')),
      ensureDir(path.join(__dirname, '/filesystem/etc/applications')),
      ensureDir(path.join(__dirname, '/filesystem/etc/desktop')),
      ensureDir(path.join(__dirname, '/filesystem/etc/expressjs')),
      ensureDir(path.join(__dirname, '/filesystem/mnt'))
    ]).then(() => {}).catch((e) => {
      console.log(e);
    });
  }

  /**
   * Checks and creates if required all Home folders
   */
  private checkHomeFolders(): Promise<void> {
    return Promise.all([
      ensureDir(path.join(__dirname, '/filesystem/home/root/Desktop')),
      ensureDir(path.join(__dirname, '/filesystem/home/root/Documents')),
      ensureDir(path.join(__dirname, '/filesystem/home/root/Downloads'))
    ]).then(() => {}).catch((e) => {
      console.log(e);
    });
  }

  /**
   * Checks and creates if required all Credentials databases
   */
  private checkCredentials(): Promise<void> {
    return pathExists(path.join(__dirname, '/filesystem/home/root/credentials.kdbx')).then((exists) => {

      // Creade new credentials database
      if (!exists) {
        const Credentials = new CredentialsModule();
        const users = readConfig(path.join(__dirname, '/filesystem/etc/shadow.json'));

        const user = users.find((obj) => {
          return obj.username === 'root';
        });

        return Credentials.createNewDb(user.uuid, 'root');
      }

    }).catch((e) => {
      console.log(e);
    });
  }

  /**
   * Main function that launch all system checks
   */
  public async initialize(): Promise<void>{
    return Promise.all([
      this.checkSystemFolders(),
      this.checkHomeFolders(),
      this.checkCredentials()
    ]).then(() => {}).catch((e) => {
      console.log(e);
    });
  }
}
