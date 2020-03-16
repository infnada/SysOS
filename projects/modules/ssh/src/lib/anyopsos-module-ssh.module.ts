import {Client, ClientChannel, ClientErrorExtensions, SFTPWrapper} from 'ssh2';

import {AnyOpsOSTerminalModule} from '@anyopsos/module-terminal';
import {BackendResponse} from '@anyopsos/backend-core/app/types/backend-response';

import {AnyOpsOSSshSessionStateModule} from './anyopsos-module-ssh-session-state';

import {SSH_TERM} from './anyopsos-module-ssh.constants';
import {ConnectionSsh} from './types/connection-ssh';

export class AnyOpsOSSshModule {

  private readonly SshSessionStateModule: AnyOpsOSSshSessionStateModule;
  private readonly TerminalsModule: AnyOpsOSTerminalModule;

  constructor(private readonly userUuid: string,
              private readonly sessionUuid: string,
              private readonly workspaceUuid: string,
              private readonly connectionUuid: string) {

    this.SshSessionStateModule = new AnyOpsOSSshSessionStateModule(this.userUuid, this.sessionUuid, this.workspaceUuid, this.connectionUuid);
    this.TerminalsModule = new AnyOpsOSTerminalModule(this.userUuid, this.sessionUuid, this.workspaceUuid, this.connectionUuid);
  }

  /**
   * Creates a new connection
   */
  newConnection(): Promise<BackendResponse> {
    return new Promise((resolve, reject) => {

      this.SshSessionStateModule.createSession().then(async (ssh2Client: Client) => {
        ssh2Client.on('end', () => reject());
        ssh2Client.on('close', (hadError: boolean) => reject(hadError));
        ssh2Client.on('error', (e: Error & ClientErrorExtensions) => reject(e));
        ssh2Client.on('banner', (message: string) => {

          // need to convert to cr/lf for proper formatting
          message = message.replace(/\r?\n/g, '\r\n');
          console.log(message);
        });
        ssh2Client.on('ready', () => resolve({status: 'ok', data: 'connected'}));

        const connectionData: ConnectionSsh = await this.SshSessionStateModule.getConnection();

        if (connectionData.type === 'ssh') {
          // session.on('keyboard-interactive', (name, instructions, instructionsLang, prompts, finish) => finish([mainServer.credential.password]));
        }
      }).catch((e: Error) => {
        reject(e);
      });

    });
  }

  /**
   * Disconnects a connection
   */
  disconnectConnection(): Promise<BackendResponse> {

    return this.SshSessionStateModule.disconnectSession().then(() => {

      return {status: 'ok', data: 'disconnected'} as BackendResponse;

    }).catch((e: Error) => {
      throw e;
    });
  }

  /**
   * Creates a Shell from an SSH Connection and attaches it to a Terminal
   */
  createShellToTerminal(terminalUuid: string): Promise<BackendResponse> {
    return new Promise(async (resolve, reject) => {

      try {
        const terminalGeometry: { cols: number; rows: number; } = this.TerminalsModule.getTerminalGeometry(terminalUuid);
        const ssh2Client: Client = this.SshSessionStateModule.getSession();

        ssh2Client.shell({
          term: SSH_TERM,
          cols: terminalGeometry.cols,
          rows: terminalGeometry.rows
        }, (e: Error, stream: ClientChannel) => {
          if (e) {
            this.TerminalsModule.deleteTerminal(terminalUuid);
            return reject(e);
          }

          this.TerminalsModule.setTerminalStream(terminalUuid, stream);
          return resolve({status: 'ok', data: 'connected'});
        });

      } catch(e) {
        return reject(e);
      }

    });
  }

  /**
   * Creates an Sftp client from an SSH Connection
   */
  createSftpClient(): Promise<BackendResponse> {
    return new Promise(async (resolve, reject) => {

      try {
        const ssh2Client: Client = this.SshSessionStateModule.getSession();

        ssh2Client.sftp((err: Error, sftp: SFTPWrapper) => {
          if (err) return reject(err);

          this.SshSessionStateModule.setSFTPWrapper(sftp);

          sftp.on('close', (code: unknown, signal: unknown) => {
            // TODO sftp disconnected
          });

          return resolve({status: 'ok', data: 'connected'});
        });

      } catch(e) {
        return reject(e);
      }

    });
  }
}
