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

  async createSession(type, uuid, host, port, username, password) {
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

  closeSession(type, uuid) {
    sshSessions[type][uuid].end();
  }

  async getAllSessions() {
    return sshSessions;
  }

  getSession(type, uuid) {
    return sshSessions[type][uuid];
  }

}
