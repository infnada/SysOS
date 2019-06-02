import validator from 'validator';
import path from 'path';
import readConfig from 'read-config';
const config =  readConfig(path.join(__dirname, '/filesystem/etc/expressjs/config.json'));
import {SshModule} from './ssh/ssh';
import {SnmpModule} from './snmp/snmp';
import {Connection} from '../../interfaces/connection';
import {CredentialsModule} from '../../routes/modules/credentials';

export class ConnectionsModule {

  SshModule: SshModule = new SshModule(this.socket);
  SnmpModule: SnmpModule = new SnmpModule(this.socket);
  CredentialsModule: CredentialsModule = new CredentialsModule();

  constructor(private socket) {

  }

  newConnection(data: Connection): void {
    data.host = (
      validator.isIP(data.host + '') && data.host) ||
      (validator.isFQDN(data.host) && data.host) ||
      (/^(([a-z]|[A-Z]|[0-9]|[!^(){}\-_~])+)?\w$/.test(data.host) && data.host
    );

    // snmp connection
    if (data.so === 'snmp') { return this.SnmpModule.newConnection(data.type, data.uuid, data.host, data.community); }

    // get username and password from credential
    this.CredentialsModule.getCredential(data.credential).then((cred) => {

      // linux connection
      if (data.so === 'linux' || data.type === 'ssh' || data.type === 'sftp') {
        data.port = (validator.isInt(data.port + '', {min: 1, max: 65535}) && data.port) || config.ssh.port;
        this.SshModule.newConnection(data.type, data.uuid, data.host, data.port, cred.username, cred.password);
      }

    }).catch((e) => {
      if (e && e.code) { return console.log(e.code); }
      if (e) { return console.log(e); }
    });

  }

  closeConnection(type: string, uuid: string): void {
    this.SshModule.closeConnection(type, uuid);
  }

}
