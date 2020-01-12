import {promisifyAll} from 'bluebird';
import {Client, ClientChannel, ExecOptions, SFTPWrapper} from 'ssh2';
import {readJSONSync} from 'fs-extra';

import {AnyOpsOSGetPathModule} from '@anyopsos/module-get-path';

import {SshServer} from './types/ssh-server';
import {AsyncSFTPWrapper} from './types/async-sftp-wrapper';
import {UserToSessionToSshMap} from './types/user-to-session-to-ssh-map';
import {UserToSessionToSftpMap} from './types/user-to-session-to-sftp-map';

const sshSessions: UserToSessionToSshMap = {};
const SFTPWrappers: UserToSessionToSftpMap = {};

export class SshSessionsModule {

  private readonly mainConfigPath: string = new AnyOpsOSGetPathModule().mainConfig;
  private readonly mainConfig: { [key: string]: any; } = readJSONSync(this.mainConfigPath);

  constructor() {
  }

  async createSession(userUuid: string, sessionUuid: string, connectionUuid: string, type: string, mainServer: SshServer, hopServerUuid: string): Promise<Client> {
    if (!sshSessions[userUuid]) sshSessions[userUuid] = {};
    if (!sshSessions[userUuid][sessionUuid]) sshSessions[userUuid][sessionUuid] = {};
    sshSessions[userUuid][sessionUuid][connectionUuid] = new Client();

    // Hop server connection
    if (hopServerUuid) {

      // TODO dynamic srcPort
      await sshSessions[userUuid][sessionUuid][hopServerUuid].forwardOut('127.0.0.1', 12345, mainServer.host, mainServer.port, async (err, stream) => {
        if (err) throw err;

        await sshSessions[userUuid][sessionUuid][connectionUuid].connect({
          sock: stream,
          username: mainServer.credential.fields.UserName,
          password: mainServer.credential.fields.Password.getText(),
          tryKeyboard: true,
          algorithms: this.mainConfig.algorithms
        });
      });

      // Normal connection
    } else {

      await sshSessions[userUuid][sessionUuid][connectionUuid].connect({
        host: mainServer.host,
        port: mainServer.port,
        username: mainServer.credential.fields.UserName,
        password: mainServer.credential.fields.Password.getText(),
        tryKeyboard: true,
        algorithms: this.mainConfig.algorithms
      });

    }

    return sshSessions[userUuid][sessionUuid][connectionUuid];
  }

  setSFTPWrapper(userUuid: string, sessionUuid: string, connectionUuid: string, sftp: SFTPWrapper): void {
    promisifyAll(sftp);

    if (!SFTPWrappers[userUuid]) SFTPWrappers[userUuid] = {};
    if (!SFTPWrappers[userUuid][sessionUuid]) SFTPWrappers[userUuid][sessionUuid] = {};
    SFTPWrappers[userUuid][sessionUuid][connectionUuid] = sftp as AsyncSFTPWrapper;
  }

  getSession(userUuid: string, sessionUuid: string, connectionUuid: string): Client {
    return sshSessions[userUuid][sessionUuid][connectionUuid];
  }

  getSFTPWrapper(userUuid: string, sessionUuid: string, connectionUuid: string): AsyncSFTPWrapper {
    return SFTPWrappers[userUuid][sessionUuid][connectionUuid];
  }

  closeSession(userUuid: string, sessionUuid: string, connectionUuid: string): void {
    if (sshSessions[userUuid][sessionUuid][connectionUuid]) sshSessions[userUuid][sessionUuid][connectionUuid].end();
  }

  // TODO (SECURITY) cmd and escape params
  execAsync(userUuid: string, sessionUuid: string, connectionUuid: string, cmd: string, params?: string[], options?: ExecOptions): Promise<any> {
    options = options || {};
    cmd += (Array.isArray(params) ? (' ' + params.join(' ')) : '');

    return new Promise(async (resolve, reject) => {
      const session = this.getSession(userUuid, sessionUuid, connectionUuid);

      session.exec(cmd, options, (err: Error, stream: ClientChannel): void => {
        if (err) return reject(err);

        let streamedData = '';
        stream.on('data', (data: string, e: Error) => {
          if (e) return reject(e);

          streamedData += data;
        }).stderr.on('data', (data: string) => {
          return reject(data);
        }).on('close', () => {
          return resolve(streamedData);
        });
      });
    });
  }

}
