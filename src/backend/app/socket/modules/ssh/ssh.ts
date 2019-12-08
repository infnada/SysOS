import {getLogger} from 'log4js';
import {Client, ClientChannel, ClientErrorExtensions, SFTPWrapper} from 'ssh2';
import * as path from 'path';
import readConfig from 'read-config';

import {TerminalsModule} from '../terminals';
import {SshSessionsModule} from './ssh-sessions';
import {SocketModule} from '../socket';
import {SshServer} from '../../../interfaces/ssh-server';

const logger = getLogger('mainlog');
const config =  readConfig(path.join(__dirname, '../../../filesystem/etc/expressjs/config.json'));
const term = config.ssh.term;

export class SshSocketModule {

  private TerminalsModule: TerminalsModule = new TerminalsModule(this.socket);
  private SshSessionsModule: SshSessionsModule = new SshSessionsModule();
  private SocketModule: SocketModule = new SocketModule(this.socket);

  constructor(private socket?) {

  }

  private closeOnError(type: string, err: any, uuid: string): void {
    logger.info(`[Socket SSH] -> closeOnError -> type [${type}], uuid [${uuid}], [${err}]`);

    this.SocketModule.emitProp(type, err, uuid, 'status');
    this.closeConnection(uuid);
  }

  closeConnection(connectionUuid: string): void {
    this.SshSessionsModule.closeSession(connectionUuid);
  }

  newConnection(type: string, uuid: string, mainServer: SshServer, hopServerUuid: string): Promise<any> {

    return new Promise((resolve, reject) => {
      this.SshSessionsModule.createSession(type, uuid, mainServer, hopServerUuid).then((ssh2Client: Client) => {
        ssh2Client.on('end', () => reject());
        ssh2Client.on('close', (hadError: boolean) => reject(hadError));
        ssh2Client.on('error', (e: Error & ClientErrorExtensions) => reject(e));
        ssh2Client.on('banner', (message: string) => {
          console.log(message);

          // need to convert to cr/lf for proper formatting
          message = message.replace(/\r?\n/g, '\r\n');
          this.SocketModule.emitData(type, uuid, message);
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

  createShellToTerminal(connectionUuid: string, terminalUuid: string): Promise<any> {
    const currentTerminal = this.TerminalsModule.getTerminalByUuid(terminalUuid);

    return new Promise((resolve, reject) => {

      this.SshSessionsModule.getSession(connectionUuid).then((ssh2Client: Client) => {

        ssh2Client.shell({
          term,
          cols: currentTerminal.cols,
          rows: currentTerminal.rows
        }, (e: Error, stream: ClientChannel) => {
          if (e) return this.TerminalsModule.terminalDisconnected(terminalUuid, e);

          this.TerminalsModule.setTerminalStream(terminalUuid, stream);
          return resolve({status: 'ok', data: 'connected'});
        });

      }).catch((e: Error) => {
        reject(e);
      });
    });
  }

  createSftpClient(connectionUuid: string): Promise<string> {

    return new Promise((resolve, reject) => {

      this.SshSessionsModule.getSession(connectionUuid).then((ssh2Client: Client) => {

        ssh2Client.sftp((err, sftp: SFTPWrapper) => {
          if (err) return this.closeOnError('sftp', err, connectionUuid);

          this.SshSessionsModule.setSFTPWrapper(connectionUuid, sftp);

          sftp.readdir('/', (e, data) => {
            if (e) return this.closeOnError('sftp', e, connectionUuid);

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

            sftp.fastPut(path.join(__dirname, '../../../filesystem') + data.src, data.dst, {
              step: (totalTransferred: number, chunk: number, total: number) => {
                const result: number = parseInt(((totalTransferred * 100) / total).toFixed(), 10);

                if (result === 100) return;

                if (result !== percentage) {
                  percentage = result;

                  // emit percentage
                  this.SocketModule.emitProgress(result, data.src, data.dst, 'upload', data.connectionUuid);
                }
              }
            }, (e) => {
              if (e) return this.closeOnError('sftp', e, connectionUuid);

              // emit percentage
              this.SocketModule.emitProgress(100, data.src, data.dst, 'upload', data.connectionUuid);

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

            sftp.fastGet(data.src, path.join(__dirname, '../../../filesystem') + data.dst, {
              step: (totalTransferred: number, chunk: number, total: number) => {
                const result: number = parseInt(((totalTransferred * 100) / total).toFixed(), 10);

                if (result === 100) return;

                if (result !== percentage) {
                  percentage = result;
                  console.log(result);

                  // emit percentage
                  this.SocketModule.emitProgress(result, data.src, data.dst, 'download', data.connectionUuid);
                }
              }
            }, (e) => {
              if (e) return this.closeOnError('sftp', e, connectionUuid);

              // emit percentage
              this.SocketModule.emitProgress(100, data.src, data.dst, 'download', data.connectionUuid);

              logger.info(`[Socket SSH] -> sftp_session__file_download -> Finished -> src [${data.src}], dst [${data.dst}], \
                connectionUuid [${data.connectionUuid}]`);
            });
          });

          sftp.on('close', (code, signal) => {
            this.closeOnError('sftp', {
              name: 'Error',
              message: ((code || signal) ?
                  (((code) ? 'CODE: ' + code : '') + ((code && signal) ? ' ' : '') + ((signal) ? 'SIGNAL: ' + signal : '')) : undefined
              )
            }, connectionUuid);
          });

          return resolve('connected');
        });

      }).catch((e: Error) => {
        reject(e);
      });
    });

  }
}
