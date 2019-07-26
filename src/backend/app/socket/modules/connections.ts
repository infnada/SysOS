import * as path from 'path';
import validator from 'validator';
import readConfig from 'read-config';

import {SshSocketModule} from './ssh/ssh';
import {SnmpSocketModule} from './snmp/snmp';
import {Connection} from '../../interfaces/connection';
import {CredentialsModule} from '../../routes/modules/credentials';

const config =  readConfig(path.resolve(__dirname, '../../filesystem/etc/expressjs/config.json'));

export class ConnectionsModule {

  private SshSocketModule: SshSocketModule = new SshSocketModule(this.socket);
  private SnmpSocketModule: SnmpSocketModule = new SnmpSocketModule(this.socket);
  private CredentialsModule: CredentialsModule = new CredentialsModule();

  constructor(private socket) {

  }

  newConnection(data: Connection): void {
    data.host = (
      validator.isIP(data.host + '') && data.host) ||
      (validator.isFQDN(data.host) && data.host) ||
      (/^(([a-z]|[A-Z]|[0-9]|[!^(){}\-_~])+)?\w$/.test(data.host) && data.host
    );

    // snmp connection
    if (data.so === 'snmp') { return this.SnmpSocketModule.newConnection(data.type, data.uuid, data.host, data.community); }

    // get username and password from credential
    this.CredentialsModule.getCredential(data.credential).then((cred) => {

      // linux connection
      if (data.so === 'linux' || data.type === 'ssh' || data.type === 'sftp') {
        data.port = (validator.isInt(data.port + '', {min: 1, max: 65535}) && data.port) || config.ssh.port;
        this.SshSocketModule.newConnection(data.type, data.uuid, data.host, data.port, cred.username, cred.password);
      }

    }).catch((e) => {
      if (e && e.code) { return console.log(e.code); }
      if (e) { return console.log(e); }
    });

  }

  closeConnection(type: string, uuid: string): void {
    this.SshSocketModule.closeConnection(type, uuid);
  }

}
