import {getLogger} from 'log4js';
import * as path from 'path';
import readConfig from 'read-config';

import {SshSessionsModule} from './ssh-sessions';
import {SocketModule} from '../socket';

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
    // sshSession.closeSession(type, uuid);
    this.SocketModule.emitProp(type, err, uuid, 'status');
    // this.SocketModule.emitProp(type, 'disconnected', uuid, 'state');
  }

  newConnection(type: string, uuid: string, host: string, port: number, username: string, password: string): void {

    this.SshSessionsModule.createSession(type, uuid, host, port, username, password).then((session: any) => {
      // session.on('end', function (err) { this.SocketModule.emitProp(type, "CONN END BY HOST " + err, uuid, 'status'); });
      session.on('close', () => {
        this.SocketModule.emitProp(type, 'CONN CLOSE', uuid, 'status');
      });
      session.on('error', (err: any) => {
        this.SocketModule.emitProp(type, 'CONN ERROR ' + err, uuid, 'status');
      });
      session.on('banner', (data: any) => {

        // need to convert to cr/lf for proper formatting
        data = data.replace(/\r?\n/g, '\r\n');
        this.SocketModule.emitData(type, data, uuid);
      });

      if (type === 'ssh') {
        session.on('keyboard-interactive', (name, instructions, instructionsLang, prompts, finish) => finish([password]));
      }

      session.on('ready', () => {
        this.SocketModule.emitProp(type, 'ssh://' + username + '@' + host + ':' + port, uuid, 'footer');
        this.SocketModule.emitProp(type, 'SSH CONNECTION ESTABLISHED', uuid, 'status');

        /**
         * SSH
         */
        if (type === 'ssh') {
          session.shell({
            term,
            cols: termCols,
            rows: termRows
          }, (err, stream) => {
            if (err) return this.closeOnError(type, err, uuid);

            this.SocketModule.emitProp(type, 'connected', uuid, 'state');
            this.socket.on('ssh_session__geometry', (data) => stream.setWindow(data.rows, data.cols));
            this.socket.on('ssh_session__data', (data) => {
              if (data.uuid !== uuid) return;
              stream.write(data.data);
            });

            stream.on('data', (data) => this.SocketModule.emitData(type, data, uuid));
            stream.on('close', (code, signal) => {
              err = {
                message: ((code || signal) ?
                  (((code) ? 'CODE: ' + code : '') + ((code && signal) ? ' ' : '') + ((signal) ? 'SIGNAL: ' + signal : '')) : undefined
                )
              };
              this.closeOnError(type, err, uuid);
            });
            stream.stderr.on('data', () => this.SocketModule.emitProp(type, err, uuid, 'status'));

          });

        /**
         * SFTP
         */
        } else if (type === 'sftp') {
          session.sftp((err, sftp) => {
            if (err) return this.closeOnError(type, err, uuid);

            session.sftpSession = sftp;

            this.SocketModule.emitProp(type, 'connected', uuid, 'state');

            sftp.readdir('/', (e, data) => {
              if (e) return this.closeOnError(type, e, uuid);

              this.SocketModule.emitPath(type, data, uuid, '/');
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
              err = {
                message: ((code || signal) ?
                  (((code) ? 'CODE: ' + code : '') + ((code && signal) ? ' ' : '') + ((signal) ? 'SIGNAL: ' + signal : '')) : undefined
                )
              };
              this.closeOnError(type, err, uuid);
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

  closeConnection(type, uuid) {
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
}
