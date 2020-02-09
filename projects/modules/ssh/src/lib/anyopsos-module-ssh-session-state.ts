import {promisifyAll} from 'bluebird';
import {Client, ClientChannel, ExecOptions, SFTPWrapper} from 'ssh2';
const validator = require('validator');

import {AnyOpsOSConfigFileModule} from '@anyopsos/module-config-file';
import {AnyOpsOSCredentialModule} from '@anyopsos/module-credential';

import {ConnectionSsh} from './types/connection-ssh';
import {ConnectionSshServer} from './types/connection-ssh-server';
import {AsyncSFTPWrapper} from './types/async-sftp-wrapper';
import {WorkspaceToSshMap} from './types/workspace-to-ssh-map';
import {UserToWorkspaceToSftpMap} from './types/user-to-workspace-to-sftp-map';

import {SSH_ALGORITHMS, SSH_CONFIG_FILE, SSH_PORT} from './anyopsos-module-ssh.constants';


const sshSessions: WorkspaceToSshMap = {};
const SFTPWrappers: UserToWorkspaceToSftpMap = {};

export class AnyOpsOSSshSessionStateModule {

  private readonly ConfigFileModule: AnyOpsOSConfigFileModule;
  private readonly CredentialModule: AnyOpsOSCredentialModule;

  constructor(private readonly userUuid: string,
              private readonly sessionUuid: string,
              private readonly workspaceUuid: string,
              private readonly connectionUuid: string) {

    this.ConfigFileModule = new AnyOpsOSConfigFileModule(this.userUuid, this.sessionUuid, this.workspaceUuid);
    this.CredentialModule = new AnyOpsOSCredentialModule(this.userUuid, this.sessionUuid, this.workspaceUuid);
  }

  /**
   * SSH Connections
   */
  async createSession(): Promise<Client> {
    if (!sshSessions[this.workspaceUuid]) sshSessions[this.workspaceUuid] = {};
    sshSessions[this.workspaceUuid][this.connectionUuid] = new Client();

    const connectionData: ConnectionSsh = await this.getConnection();
    const mainServer: ConnectionSshServer = await this.getConnectionMainServer();

    // Hop server connection
    if (connectionData.hopServerUuid) {

      // TODO dynamic srcPort
      // TODO connect if not connected
      await sshSessions[this.workspaceUuid][connectionData.hopServerUuid].forwardOut('127.0.0.1', 12345, mainServer.host, mainServer.port, async (err: Error, stream: ClientChannel) => {
        if (err) throw err;

        await sshSessions[this.workspaceUuid][this.connectionUuid].connect({
          sock: stream,
          username: mainServer.credential.fields.UserName,
          password: mainServer.credential.fields.Password.getText(),
          tryKeyboard: true,
          algorithms: SSH_ALGORITHMS
        });
      });

    // Normal connection
    } else {

      await sshSessions[this.workspaceUuid][this.connectionUuid].connect({
        host: mainServer.host,
        port: mainServer.port,
        username: mainServer.credential.fields.UserName,
        password: mainServer.credential.fields.Password.getText(),
        tryKeyboard: true,
        algorithms: SSH_ALGORITHMS
      });

    }

    return sshSessions[this.workspaceUuid][this.connectionUuid];
  }

  async disconnectSession(): Promise<void> {
    if (sshSessions[this.workspaceUuid][this.connectionUuid]) sshSessions[this.workspaceUuid][this.connectionUuid].end();
  }

  getSession(): Client {
    if (!sshSessions[this.workspaceUuid]?.[this.connectionUuid]) throw new Error('resource_invalid');

    return sshSessions[this.workspaceUuid][this.connectionUuid];
  }

  /**
   * SFTP Wrappers on top of SSH Connections
   */
  setSFTPWrapper(sftp: SFTPWrapper): void {
    promisifyAll(sftp);

    if (!SFTPWrappers[this.userUuid]) SFTPWrappers[this.userUuid] = {};
    if (!SFTPWrappers[this.userUuid][this.workspaceUuid]) SFTPWrappers[this.userUuid][this.workspaceUuid] = {};
    SFTPWrappers[this.userUuid][this.workspaceUuid][this.connectionUuid] = sftp as AsyncSFTPWrapper;
  }

  getSFTPWrapper(): AsyncSFTPWrapper {
    if (!SFTPWrappers[this.userUuid]?.[this.workspaceUuid]?.[this.connectionUuid]) throw new Error('resource_invalid');

    return SFTPWrappers[this.userUuid][this.workspaceUuid][this.connectionUuid];
  }

  /**
   * Returns the connection data from workspaceUuid & connectionUuid
   */
  async getConnection(): Promise<ConnectionSsh> {
    return this.ConfigFileModule.get(SSH_CONFIG_FILE, this.connectionUuid) as Promise<ConnectionSsh>;
  }

  /**
   * Returns the connection data from workspaceUuid & connectionUuid
   */
  async getConnectionMainServer(): Promise<ConnectionSshServer> {
    const connectionData: ConnectionSsh = await this.getConnection();

    return {
      host: connectionData.host,
      port: (validator.isInt(connectionData.port.toString(), {min: 1, max: 65535}) && connectionData.port) || SSH_PORT,
      credential: await this.CredentialModule.getCredential(connectionData.credential)
    };

  }

  // TODO (SECURITY) cmd and escape params
  execAsync(cmd: string, params: string[] = [], options: ExecOptions = {}): Promise<string> {

    cmd += (Array.isArray(params) ? (' ' + params.join(' ')) : '');

    return new Promise(async (resolve, reject) => {
      const session = this.getSession();

      session.exec(cmd, options, (err: Error, stream: ClientChannel): void => {
        if (err) return reject(err);

        let streamedData: string = '';
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
