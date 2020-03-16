import {configure, getLogger, Logger} from 'log4js';
import {ensureDir, pathExistsSync, writeJSONSync} from 'fs-extra';
import {join} from 'path';

import {AnyOpsOSConfigFileModule} from '@anyopsos/module-config-file';
import {AnyOpsOSSysGetPathModule} from '@anyopsos/module-sys-get-path';
import {User} from '@anyopsos/module-auth';

const logger: Logger = getLogger('mainLog');

export class Init {

  constructor() {
    configure({
      appenders: {
        console: {type: 'console', level: 'trace'}
      },
      categories: {
        default: {appenders: ['console'], level: 'trace'},
        mainLog: {appenders: ['console'], level: 'trace'},
        file: {appenders: ['console'], level: 'trace'},
        folder: {appenders: ['console'], level: 'trace'},
        configFile: {appenders: ['console'], level: 'trace'}
      }
    });
  }

  /**
   * Checks and creates if required all System folders
   */
  private checkSystemFolders(): Promise<void> {
    logger.trace(`[FileSystem] -> checkSystemFolders`);

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
    logger.trace(`[FileSystem] -> checkHomeFolders`);

    const users: User[] = await new AnyOpsOSConfigFileModule().get(new AnyOpsOSSysGetPathModule().shadow) as User[];

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
    logger.trace(`[FileSystem] -> checkHomeFiles`);

    const users: User[] = await new AnyOpsOSConfigFileModule().get(new AnyOpsOSSysGetPathModule().shadow) as User[];

    users.forEach((user: User) => {
      const taskBarFile: string = join(__dirname, `/filesystem/${user.home}/Workspaces/default/etc/task_bar.json`);

      if (!pathExistsSync(taskBarFile)) {
        writeJSONSync(taskBarFile, []);
      }
    });
  }

  /**
   * Main function that launch all system checks
   */
  public async initialize(): Promise<void> {
    logger.trace(`[FileSystem] -> initialize`);

    return Promise.all([
      this.checkSystemFolders(),
      this.checkHomeFolders(),
      this.checkHomeFiles()
    ]).then(() => {}).catch((e) => {
      console.log(e);
    });
  }
}
