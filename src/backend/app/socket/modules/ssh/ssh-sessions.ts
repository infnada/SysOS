import * as path from 'path';
import readConfig from 'read-config';
import ssh2 from 'ssh2';

const config =  readConfig(path.join(__dirname, '../../../filesystem/etc/expressjs/config.json'));
const sshSessions: {ssh: [], sftp: [], smanager: []} = {
  ssh: [],
  sftp: [],
  smanager: []
};

export class SshSessionsModule {

  private SSH = ssh2.Client;
  private algorithms = config.algorithms;

  constructor() {

  }

  async createSession(type: string, uuid: string, host: string, port: number, username: string, password: string): ssh2.Client {
    sshSessions[type][uuid] = new this.SSH();

    await sshSessions[type][uuid].connect({
      host,
      port,
      username,
      password,
      tryKeyboard: true,
      algorithms: this.algorithms
    });

    return sshSessions[type][uuid];
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
