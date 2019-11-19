import * as path from 'path';
import readConfig from 'read-config';
import ssh2 from 'ssh2';

import {SshServer} from '../../../interfaces/ssh-server';

const config =  readConfig(path.join(__dirname, '../../../filesystem/etc/expressjs/config.json'));
const sshSessions: { ssh: []; sftp: []; smanager: []; } = {
  ssh: [],
  sftp: [],
  smanager: []
};

export class SshSessionsModule {

  private SSH = ssh2.Client;
  private algorithms = config.algorithms;

  constructor() {

  }

  async createSession(type: string, uuid: string, mainServer: SshServer, hopServer: SshServer): ssh2.Client {
    sshSessions[type][uuid] = new this.SSH();

    // Hop server connection
    if (hopServer) {
      await sshSessions[type][uuid + 'hop'].connect({
        host: hopServer.host,
        port: hopServer.port,
        username: hopServer.credential.fields.UserName,
        password: hopServer.credential.fields.Password.getText(),
      });

      sshSessions[type][uuid + 'hop'].on('ready', async () => {
        console.log('FIRST :: connection ready');
        // Alternatively, you could use netcat or socat with exec() instead of
        // forwardOut()
        await sshSessions[type][uuid + 'hop'].forwardOut('127.0.0.1', 12345, mainServer.host, mainServer.port, async (err, stream) => {
          if (err) {
            console.log('FIRST :: forwardOut error: ' + err);
            return sshSessions[type][uuid + 'hop'].end();
          }

          await sshSessions[type][uuid].connect({
            sock: stream,
            username: mainServer.credential.fields.UserName,
            password: mainServer.credential.fields.Password.getText(),
            tryKeyboard: true,
            algorithms: this.algorithms
          });

          return sshSessions[type][uuid];
        });
      });

    // Normal connection
    } else {
      await sshSessions[type][uuid].connect({
        host: mainServer.host,
        port: mainServer.port,
        username: mainServer.credential.fields.UserName,
        password: mainServer.credential.fields.Password.getText(),
        tryKeyboard: true,
        algorithms: this.algorithms
      });

      return sshSessions[type][uuid];
    }


  }

  closeSession(type: string, uuid: string): void {
    sshSessions[type][uuid].end();
  }

  async getAllSessions(): Promise<any> {
    return sshSessions;
  }

  getSession(type: string, uuid: string): ssh2.Client {
    return sshSessions[type][uuid];
  }

}
