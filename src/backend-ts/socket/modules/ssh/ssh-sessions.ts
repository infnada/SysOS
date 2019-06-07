import * as path from 'path';
import readConfig from 'read-config';
import ssh2 from 'ssh2';

const config =  readConfig(path.join(__dirname, '../../../filesystem/etc/expressjs/config.json'));

export class SshSessionsModule {

  SSH = ssh2.Client;
  algorithms = config.algorithms;
  sshSessions: {ssh: [], sftp: [], smanager: []} = {
    ssh: [],
    sftp: [],
    smanager: []
  };

  constructor() {

  }

  async createSession(type, uuid, host, port, username, password) {
    this.sshSessions[type][uuid] = new this.SSH();

    await this.sshSessions[type][uuid].connect({
      host,
      port,
      username,
      password,
      tryKeyboard: true,
      algorithms: this.algorithms
    });

    return this.sshSessions[type][uuid];
  }

  closeSession(type, uuid) {
    this.sshSessions[type][uuid].end();
  }

  async getAllSessions() {
    return this.sshSessions;
  }

  getSession(type, uuid) {
    return this.sshSessions[type][uuid];
  }

}
