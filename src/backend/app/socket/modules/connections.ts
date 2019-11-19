import * as path from 'path';
import validator from 'validator';
import readConfig from 'read-config';

import {SshSocketModule} from './ssh/ssh';
import {SnmpSocketModule} from './snmp/snmp';
import {KubernetesSocketModule} from './kubernetes/kubernetes';
import {DockerSocketModule} from './docker/docker';
import {CredentialsModule} from '../../routes/modules/credentials';

import {ConnectionSsh} from '../../interfaces/socket-connections/connection-ssh';
import {ConnectionSftp} from '../../interfaces/socket-connections/connection-sftp';
import {ConnectionLinux} from '../../interfaces/socket-connections/connection-linux';
import {ConnectionSnmp} from '../../interfaces/socket-connections/connection-snmp';
import {ConnectionKubernetes} from '../../interfaces/socket-connections/connection-kubernetes';
import {ConnectionDocker} from '../../interfaces/socket-connections/connection-docker';

const config =  readConfig(path.resolve(__dirname, '../../filesystem/etc/expressjs/config.json'));

export class ConnectionsModule {

  private SshSocketModule: SshSocketModule = new SshSocketModule(this.socket);
  private SnmpSocketModule: SnmpSocketModule = new SnmpSocketModule(this.socket);
  private KubernetesSocketModule: KubernetesSocketModule = new KubernetesSocketModule(this.socket);
  private DockerSocketModule: DockerSocketModule = new DockerSocketModule(this.socket);
  private CredentialsModule: CredentialsModule = new CredentialsModule();

  constructor(private socket) {

  }

  async newConnection(data: ConnectionSsh | ConnectionSftp | ConnectionLinux | ConnectionSnmp | ConnectionKubernetes | ConnectionDocker): Promise<void> {
    let hopServer = null;

    /**
     * KUBERNETES
     */
    if (data.type === 'kubernetes') return this.KubernetesSocketModule.newConnection(data as ConnectionKubernetes);

    /**
     * DOCKER
     */
    if (data.type === 'docker') return this.DockerSocketModule.newConnection(data as ConnectionDocker);

    data.host = (
      validator.isIP(data.host + '') && data.host) ||
      (validator.isFQDN(data.host) && data.host) ||
      (/^(([a-z]|[A-Z]|[0-9]|[!^(){}\-_~])+)?\w$/.test(data.host) && data.host
    );

    /**
     * SNMP
     */
    if (data.type === 'snmp') return this.SnmpSocketModule.newConnection(data as ConnectionSnmp);

    /**
     * SSH, SFTP, LINUX
     */

    if (data.type === 'linux' || data.type === 'ssh' || data.type === 'sftp') {
      // Check if hop server
      if (data.hophost) {
        data.hophost = (
          validator.isIP(data.hophost + '') && data.hophost) ||
          (validator.isFQDN(data.hophost) && data.hophost) ||
          (/^(([a-z]|[A-Z]|[0-9]|[!^(){}\-_~])+)?\w$/.test(data.hophost) && data.hophost
          );

        hopServer = {
          host: data.hophost,
          port: (validator.isInt(data.hopport + '', {min: 1, max: 65535}) && data.hopport) || config.ssh.port,
          credential: await this.CredentialsModule.getCredential(this.socket.request.session.uuid, data.hopcredential)
        };

      }

      const mainServer = {
        host: data.host,
        port: (validator.isInt(data.port + '', {min: 1, max: 65535}) && data.port) || config.ssh.port,
        credential: await this.CredentialsModule.getCredential(this.socket.request.session.uuid, data.credential)
      };


      this.SshSocketModule.newConnection(data.type, data.uuid, mainServer, hopServer);
    }

  }

  closeConnection(type: string, uuid: string): void {
    this.SshSocketModule.closeConnection(type, uuid);
  }

}
