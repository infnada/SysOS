import * as path from 'path';
import readConfig from 'read-config';
import {Client, SFTPWrapper} from 'ssh2';

import {SshServer} from '../../../interfaces/ssh-server';

const config =  readConfig(path.join(__dirname, '../../../filesystem/etc/expressjs/config.json'));

const sshSessions: Client[] = [];
const SFTPWrappers: SFTPWrapper[] = [];

export class SshSessionsModule {

  private algorithms = config.algorithms;

  constructor() {

  }

  async createSession(type: string, uuid: string, mainServer: SshServer, hopServerUuid: string): Promise<Client> {
    sshSessions[uuid] = new Client();

    // Hop server connection
    if (hopServerUuid) {

      await sshSessions[hopServerUuid].forwardOut('127.0.0.1', 12345, mainServer.host, mainServer.port, async (err, stream) => {
        if (err) throw err;

        await sshSessions[uuid].connect({
          sock: stream,
          username: mainServer.credential.fields.UserName,
          password: mainServer.credential.fields.Password.getText(),
          tryKeyboard: true,
          algorithms: this.algorithms
        });
      });

    // Normal connection
    } else {

      await sshSessions[uuid].connect({
        host: mainServer.host,
        port: mainServer.port,
        username: mainServer.credential.fields.UserName,
        password: mainServer.credential.fields.Password.getText(),
        tryKeyboard: true,
        algorithms: this.algorithms
      });

    }

    return sshSessions[uuid];
  }

  setSFTPWrapper(uuid: string, sftp: SFTPWrapper) {
    SFTPWrappers[uuid] = sftp;
  }

  closeSession(uuid: string): void {
    if (sshSessions[uuid]) sshSessions[uuid].end();
  }

  async getAllSessions(): Promise<Client[]> {
    return sshSessions;
  }

  async getSession(uuid: string): Promise<Client> {
    return sshSessions[uuid];
  }

  async getSFTPWrapper(uuid: string): Promise<SFTPWrapper> {
    return SFTPWrappers[uuid];
  }

}
