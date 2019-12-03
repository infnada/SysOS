import {getLogger} from 'log4js';
import {Client, ClientChannel, ClientErrorExtensions, SFTPWrapper} from 'ssh2';
import * as path from 'path';
import readConfig from 'read-config';

import {SshSessionsModule} from './ssh-sessions';
import {SocketModule} from '../socket';
import {SshServer} from '../../../interfaces/ssh-server';


const logger = getLogger('mainlog');
const config =  readConfig(path.join(__dirname, '../../../filesystem/etc/expressjs/config.json'));
const term = config.ssh.term;
const termCols = 80;
const termRows = 24;

export class SshSocketModule {

  private SshSessionsModule: SshSessionsModule = new SshSessionsModule();
  private SocketModule: SocketModule = new SocketModule(this.socket);

  constructor(private socket?) {

  }

  private closeOnError(type: string, err: any, uuid: string): void {
    logger.info(`[Socket SSH] -> closeOnError -> type [${type}], uuid [${uuid}], [${err}]`);

    this.SocketModule.emitProp(type, err, uuid, 'status');
    this.closeConnection(type, uuid);
  }

  closeConnection(type: string, uuid: string): void {
    if (uuid === null) {
      this.SshSessionsModule.getAllSessions().then(sessions => {
        sessions.ssh.forEach((session: any) => session.end());
        sessions.sftp.forEach((session: any) => session.end());
      });
    } else {
      this.SocketModule.emitProp(type, 'disconnected', uuid, 'state');
      this.SshSessionsModule.closeSession(type, uuid);
    }
  }

  newConnection(type: string, uuid: string, mainServer: SshServer, hopServer: SshServer): void {

    this.SshSessionsModule.createSession(type, uuid, mainServer, hopServer).then((ssh2Client: Client) => {
      ssh2Client.on('end', (err) => this.SocketModule.emitProp(type, 'CONN END BY HOST ' + err, uuid, 'status'));
      ssh2Client.on('close', (hadError: boolean) => this.SocketModule.emitProp(type, 'CONN CLOSE', uuid, 'status'));
      ssh2Client.on('error', (err: Error & ClientErrorExtensions) => this.SocketModule.emitProp(type, 'CONN ERROR ' + err, uuid, 'status'));
      ssh2Client.on('banner', (message: string) => {

        // need to convert to cr/lf for proper formatting
        message = message.replace(/\r?\n/g, '\r\n');
        this.SocketModule.emitData(type, uuid, message);
      });

      if (type === 'ssh') {
        // session.on('keyboard-interactive', (name, instructions, instructionsLang, prompts, finish) => finish([mainServer.credential.password]));
      }

      ssh2Client.on('ready', () => {
        this.SocketModule.emitProp(type, 'ssh://' + mainServer.credential.fields.UserName + '@' + mainServer.host + ':' + mainServer.port, uuid, 'footer');
        this.SocketModule.emitProp(type, 'SSH connection established', uuid, 'status');
        this.SocketModule.emitProp(type, 'connected', uuid, 'state');

        /**
         * Create SSH Shell
         */
        if (type === 'ssh') {
          ssh2Client.shell({
            term,
            cols: termCols,
            rows: termRows
          }, (err: Error, stream: ClientChannel) => {
            if (err) return this.closeOnError(type, err, uuid);

            // TODO check uuid
            this.socket.on('ssh_session__geometry', (data) => stream.setWindow(data.rows, data.cols, null, null));
            this.socket.on('ssh_session__data', (data) => {
              if (data.uuid !== uuid) return;
              stream.write(data.data);
            });

            stream.stderr.on('data', (chunk: Buffer | string) => this.SocketModule.emitProp(type, chunk.toString(), uuid, 'status'));
            stream.on('data', (data: string) => this.SocketModule.emitData(type, uuid, data));
            stream.on('close', (code: number | null, signal: string) => {
              this.closeOnError(type,
                {
                  name: 'Error',
                  message: ((code || signal) ?
                      (((code) ? 'CODE: ' + code : '') + ((code && signal) ? ' ' : '') + ((signal) ? 'SIGNAL: ' + signal : '')) : undefined
                  )
                }, uuid);
            });

          });

        /**
         * SFTP
         */
        } else if (type === 'sftp') {
          ssh2Client.sftp((err, sftp: SFTPWrapper) => {
            if (err) return this.closeOnError(type, err, uuid);

            // TODO
            // @ts-ignore
            ssh2Client.sftpSession = sftp;

            this.SocketModule.emitProp(type, 'connected', uuid, 'state');

            sftp.readdir('/', (e, data) => {
              if (e) return this.closeOnError(type, e, uuid);

              this.SocketModule.emitData(type, uuid, {
                path: '/',
                data
              });
            });

            /**
             * sftp_session__file_upload
             */
            this.socket.on('sftp_session__file_upload', (data: {src: string, dst: string, connectionUuid: string}) => {
              if (data.connectionUuid !== uuid) return;

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
                if (e) return this.closeOnError(type, e, uuid);

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
              if (data.connectionUuid !== uuid) return;

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
                if (e) return this.closeOnError(type, e, uuid);

                // emit percentage
                this.SocketModule.emitProgress(100, data.src, data.dst, 'download', data.connectionUuid);

                logger.info(`[Socket SSH] -> sftp_session__file_download -> Finished -> src [${data.src}], dst [${data.dst}], \
                connectionUuid [${data.connectionUuid}]`);
              });
            });

            sftp.on('close', (code, signal) => {
              this.closeOnError(type, {
                name: 'Error',
                message: ((code || signal) ?
                    (((code) ? 'CODE: ' + code : '') + ((code && signal) ? ' ' : '') + ((signal) ? 'SIGNAL: ' + signal : '')) : undefined
                )
              }, uuid);
            });
          });

        /**
         * SMANAGER
         */
        } else if (type === 'smanager') {
          this.SocketModule.emitProp(type, 'connected', uuid, 'state');
        }
      });
    });

  }
}
