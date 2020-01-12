import {Socket} from 'socket.io';
import {getLogger, Logger} from 'log4js';
import {Client, ClientChannel, ClientErrorExtensions, SFTPWrapper} from 'ssh2';
import {readJSONSync} from 'fs-extra';
import {join} from 'path';

import {AnyOpsOSGetPathModule} from '@anyopsos/module-get-path';
import {AnyOpsOSTerminalModule} from '@anyopsos/module-terminal';
import {AnyOpsOSSocketModule} from '@anyopsos/module-socket';
import {BackendResponse} from '@anyopsos/backend/app/types/backend-response';

import {SshSessionsModule} from './ssh-sessions';
import {SshServer} from './types/ssh-server';

const logger: Logger = getLogger('mainlog');

export class AnyOpsOSSshModule {

  private readonly mainConfigPath: string = new AnyOpsOSGetPathModule().mainConfig;
  private readonly mainConfig: { [key: string]: any; } = readJSONSync(this.mainConfigPath);

  private readonly TerminalsModule: AnyOpsOSTerminalModule = new AnyOpsOSTerminalModule(this.socket);
  private readonly SshSessionsModule: SshSessionsModule = new SshSessionsModule();
  private readonly SocketModule: AnyOpsOSSocketModule = new AnyOpsOSSocketModule(this.socket);

  constructor(private readonly socket: Socket) {
  }

  private closeOnError(userUuid: string, sessionUuid: string, connectionUuid: string, type: string, err: any): void {
    logger.info(`[Socket SSH] -> closeOnError -> type [${type}], connectionUuid [${connectionUuid}], [${err}]`);

    this.SocketModule.emitProp(type, err, connectionUuid, 'status');
    this.closeConnection(userUuid, sessionUuid, connectionUuid);
  }

  closeConnection(userUuid: string, sessionUuid: string, connectionUuid: string): void {
    this.SshSessionsModule.closeSession(userUuid, sessionUuid, connectionUuid);
  }

  newConnection(userUuid: string, sessionUuid: string, connectionUuid: string, type: string, mainServer: SshServer, hopServerUuid: string): Promise<BackendResponse> {

    return new Promise((resolve, reject) => {
      this.SshSessionsModule.createSession(userUuid, sessionUuid, connectionUuid, type, mainServer, hopServerUuid).then((ssh2Client: Client) => {
        ssh2Client.on('end', () => reject());
        ssh2Client.on('close', (hadError: boolean) => reject(hadError));
        ssh2Client.on('error', (e: Error & ClientErrorExtensions) => reject(e));
        ssh2Client.on('banner', (message: string) => {
          console.log(message);

          // need to convert to cr/lf for proper formatting
          message = message.replace(/\r?\n/g, '\r\n');
          this.SocketModule.emitData(type, connectionUuid, message);
        });
        ssh2Client.on('ready', () => resolve({status: 'ok', data: 'connected'}));

        if (type === 'ssh') {
          // session.on('keyboard-interactive', (name, instructions, instructionsLang, prompts, finish) => finish([mainServer.credential.password]));
        }
      }).catch((e: Error) => {
        reject(e);
      });
    });
  }

  createShellToTerminal(userUuid: string, sessionUuid: string, connectionUuid: string, terminalUuid: string): Promise<BackendResponse> {
    const currentTerminal = this.TerminalsModule.getTerminalByUuid(userUuid, sessionUuid, terminalUuid);

    return new Promise(async (resolve, reject) => {

      const ssh2Client: Client = this.SshSessionsModule.getSession(userUuid, sessionUuid, terminalUuid);

      ssh2Client.shell({
        term: this.mainConfig.ssh.term,
        cols: currentTerminal.cols,
        rows: currentTerminal.rows
      }, (e: Error, stream: ClientChannel) => {
        if (e) {
          this.TerminalsModule.terminalDisconnected(terminalUuid, e.toString());
          return reject(e);
        }

        this.TerminalsModule.setTerminalStream(userUuid, sessionUuid, terminalUuid, stream);
        return resolve({status: 'ok', data: 'connected'});
      });

    });
  }

  createSftpClient(userUuid: string, sessionUuid: string, connectionUuid: string): Promise<BackendResponse> {

    return new Promise((resolve, reject) => {

      const ssh2Client: Client = this.SshSessionsModule.getSession(userUuid, sessionUuid, connectionUuid);
      ssh2Client.sftp((err, sftp: SFTPWrapper) => {
        if (err) return this.closeOnError(userUuid, sessionUuid, connectionUuid, 'sftp', err);

        this.SshSessionsModule.setSFTPWrapper(userUuid, sessionUuid, connectionUuid, sftp);

        sftp.readdir('/', (e, data) => {
          if (e) return this.closeOnError(userUuid, sessionUuid, connectionUuid, 'sftp', e);

          this.SocketModule.emitData('sftp', connectionUuid, {
            path: '/',
            data
          });
        });

        /**
         * sftp_session__file_upload
         */
        this.socket.on('sftp_session__file_upload', (data: {src: string, dst: string, connectionUuid: string}) => {
          if (data.connectionUuid !== connectionUuid) return;

          logger.info(`[Socket SSH] -> sftp_session__file_upload -> src [${data.src}], dst [${data.dst}], \
            connectionUuid [${data.connectionUuid}]`);

          let percentage = 0;

          sftp.fastPut(join(new AnyOpsOSGetPathModule().filesystem, data.src), data.dst, {
            step: (totalTransferred: number, chunk: number, total: number) => {
              const result: number = parseInt(((totalTransferred * 100) / total).toFixed(), 10);

              if (result === 100) return;

              if (result !== percentage) {
                percentage = result;

                // emit percentage
                this.SocketModule.emitProgress(result.toString(), data.src, data.dst, 'upload', data.connectionUuid);
              }
            }
          }, (e) => {
            if (e) return this.closeOnError(userUuid, sessionUuid, connectionUuid, 'sftp', e);

            // emit percentage
            this.SocketModule.emitProgress('100', data.src, data.dst, 'upload', data.connectionUuid);

            logger.info(`[Socket SSH] -> sftp_session__file_upload -> Finished -> src [${data.src}], dst [${data.dst}], \
              connectionUuid [${data.connectionUuid}]`);
          });
        });

        /**
         * sftp_session__file_download
         */
        this.socket.on('sftp_session__file_download', (data: {src: string, dst: string, connectionUuid: string}) => {
          if (data.connectionUuid !== connectionUuid) return;

          logger.info(`[Socket SSH] -> sftp_session__file_download -> src [${data.src}], dst [${data.dst}], \
            connectionUuid [${data.connectionUuid}]`);

          let percentage = 0;

          sftp.fastGet(data.src, join(new AnyOpsOSGetPathModule().filesystem, data.dst), {
            step: (totalTransferred: number, chunk: number, total: number) => {
              const result: number = parseInt(((totalTransferred * 100) / total).toFixed(), 10);

              if (result === 100) return;

              if (result !== percentage) {
                percentage = result;
                console.log(result);

                // emit percentage
                this.SocketModule.emitProgress(result.toString(), data.src, data.dst, 'download', data.connectionUuid);
              }
            }
          }, (e) => {
            if (e) return this.closeOnError(userUuid, sessionUuid, connectionUuid, 'sftp', e);

            // emit percentage
            this.SocketModule.emitProgress('100', data.src, data.dst, 'download', data.connectionUuid);

            logger.info(`[Socket SSH] -> sftp_session__file_download -> Finished -> src [${data.src}], dst [${data.dst}], \
              connectionUuid [${data.connectionUuid}]`);
          });
        });

        sftp.on('close', (code: unknown, signal: unknown) => {
          this.closeOnError(userUuid, sessionUuid, connectionUuid, 'sftp', {
            name: 'Error',
            message: ((code || signal) ?
                (((code) ? 'CODE: ' + code : '') + ((code && signal) ? ' ' : '') + ((signal) ? 'SIGNAL: ' + signal : '')) : undefined
            )
          });
        });

        return resolve({status: 'ok', data: 'connected'});
      });
    });

  }
}
