import * as path from 'path';
import readConfig from 'read-config';

import {SshSessionsModule} from './ssh-sessions';
import {SocketModule} from '../socket';

const config =  readConfig(path.join(__dirname, '../../../filesystem/etc/expressjs/config.json'));
const term = config.ssh.term;
const termCols = 80;
const termRows = 24;

export class SshModule {

  SshSessionsModule: SshSessionsModule = new SshSessionsModule();
  SocketModule: SocketModule = new SocketModule(this.socket);

  constructor(private socket?) {

  }

  private closeOnError(type, err, uuid) {
    console.log(err);
    // sshSession.closeSession(type, uuid);
    this.SocketModule.emitProp(type, err, uuid, 'status');
    // this.SocketModule.emitProp(type, 'disconnected', uuid, 'type');
  }

  newConnection(type, uuid, host, port, username, password) {

    this.SshSessionsModule.createSession(type, uuid, host, port, username, password).then((session: any) => {
      // session.on('end', function (err) { this.SocketModule.emitProp(type, "CONN END BY HOST " + err, uuid, 'status'); });
      session.on('close', () => {
        this.SocketModule.emitProp(type, 'CONN CLOSE', uuid, 'status');
      });
      session.on('error', (err) => {
        this.SocketModule.emitProp(type, 'CONN ERROR ' + err, uuid, 'status');
      });
      session.on('banner', (data) => {

        // need to convert to cr/lf for proper formatting
        data = data.replace(/\r?\n/g, '\r\n');
        this.SocketModule.emitData(type, data, uuid);
      });

      if (type === 'ssh') {
        session.on('keyboard-interactive', (name, instructions, instructionsLang, prompts, finish) => {
          finish([password]);
        });
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
            if (err) { return this.closeOnError(type, err, uuid); }

            this.SocketModule.emitProp(type, 'connected', uuid, 'type');
            this.socket.on('ssh_session__geometry', (data) => {
              stream.setWindow(data.rows, data.cols);
            });
            this.socket.on('ssh_session__data', (data) => {
              if (data.uuid !== uuid) { return; }
              stream.write(data.data);
            });

            stream.on('data', (data) => {
              this.SocketModule.emitData(type, data, uuid);
            });
            stream.on('close', (code, signal) => {
              err = {
                message: ((code || signal) ?
                  (((code) ? 'CODE: ' + code : '') + ((code && signal) ? ' ' : '') + ((signal) ? 'SIGNAL: ' + signal : '')) : undefined
                )
              };
              this.closeOnError(type, err, uuid);
            });
            stream.stderr.on('data', () => {
              this.SocketModule.emitProp(type, err, uuid, 'status');
            });

          });

          /**
           * SFTP
           */
        } else if (type === 'sftp') {
          session.sftp((err, sftp) => {
            if (err) { return this.closeOnError(type, err, uuid); }

            session.sftpSession = sftp;

            this.SocketModule.emitProp(type, 'connected', uuid, 'type');

            sftp.readdir('/', (e, data) => {
              if (e) { return this.closeOnError(type, e, uuid); }

              this.SocketModule.emitPath(type, data, uuid, '/');
            });

            /**
             * sftp_session__file_upload
             */
            this.socket.on('sftp_session__file_upload', (data) => {
              if (data.connectionUuid !== uuid) { return; }

              let percentage = 0;

              sftp.fastPut(path.join(__dirname, '../../filesystem') + data.src, data.dst, {
                step: (a, b, c) => {

                  const result: number = parseInt(((a * 100) / c).toFixed(), 10);
                  if (result !== percentage) {
                    percentage = result;

                    this.SocketModule.emitProgress(result, data.src, data.dst, 'upload', data.connectionUuid);
                    // emit percentage
                  }
                }
              }, (e) => {
                console.log(e);
                if (e) { return this.closeOnError(type, e, uuid); }
              });
            });

            /**
             * sftp_session__file_download
             */
            this.socket.on('sftp_session__file_download', (data) => {
              if (data.connectionUuid !== uuid) { return; }

              console.log(data.src, data.dst);

              let percentage = 0;

              sftp.fastGet(data.src, path.join(__dirname, '../../filesystem') + data.dst, {
                step: (a, b, c) => {

                  const result: number = parseInt(((a * 100) / c).toFixed(), 10);
                  if (result !== percentage) {
                    percentage = result;

                    this.SocketModule.emitProgress(result, data.src, data.dst, 'download', data.connectionUuid);
                    // emit percentage
                  }
                }
              }, (e) => {
                console.log(e);
                if (e) { return this.closeOnError(type, e, uuid); }
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
          this.SocketModule.emitProp(type, 'connected', uuid, 'type');
        }
      });
    });

  }

  closeConnection(type, uuid) {
    if (uuid === null) {
      this.SshSessionsModule.getAllSessions().then(sessions => {
        sessions.ssh.forEach((session: any) => {
          session.end();
        });
        sessions.sftp.forEach((session: any) => {
          session.end();
        });
      });
    } else {
      this.SocketModule.emitProp(type, 'disconnected', uuid, 'type');
      this.SshSessionsModule.closeSession(type, uuid);
    }
  }
}
