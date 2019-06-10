import {Injectable} from '@angular/core';

import {BehaviorSubject, Observable} from 'rxjs';
import {NGXLogger} from 'ngx-logger';
import {ToastrService} from 'ngx-toastr';
import {Socket} from 'ngx-socket-io';
import {v4 as uuidv4} from 'uuid';

import {IMConnection} from '../interfaces/IMConnection';
import {FileSystemService} from '../../../services/file-system.service';
import {InfrastructureManagerVmwareService} from './infrastructure-manager-vmware.service';
import {InfrastructureManagerNetappService} from './infrastructure-manager-netapp.service';

@Injectable({
  providedIn: 'root'
})
export class InfrastructureManagerService {

  private $connections: BehaviorSubject<IMConnection[]>;
  private $activeConnection: BehaviorSubject<string>;
  private dataStore: {  // This is where we will store our data in memory
    connections: IMConnection[],
    activeConnection: string
  };
  connections: Observable<any>;
  activeConnection: Observable<any>;

  constructor(private logger: NGXLogger,
              private Toastr: ToastrService,
              private socket: Socket,
              private FileSystem: FileSystemService,
              private InfrastructureManagerVMWare: InfrastructureManagerVmwareService,
              private InfrastructureManagerNetApp: InfrastructureManagerNetappService) {
    this.dataStore = {connections: [], activeConnection: null};
    this.$connections = new BehaviorSubject([]) as BehaviorSubject<IMConnection[]>;
    this.$activeConnection = new BehaviorSubject(null) as BehaviorSubject<string>;
    this.connections = this.$connections.asObservable();
    this.activeConnection = this.$activeConnection.asObservable();
  }

  getActiveConnection(): IMConnection {
    if (this.dataStore.activeConnection === null) return null;

    return this.dataStore.connections.find(obj => obj.uuid === this.dataStore.activeConnection);
  }

  getConnectionByUuid(uuid: string): IMConnection {
    if (!uuid) throw new Error('uuid');

    return this.dataStore.connections.find(obj => obj.uuid === uuid);
  }

  setActiveConnection(uuid: string): void {
    this.dataStore.activeConnection = uuid;

    // broadcast data to subscribers
    this.$activeConnection.next(Object.assign({}, this.dataStore).activeConnection);
  }

  connect(connection: IMConnection): void {
    if (!connection) throw new Error('connection_not_found');

    this.logger.debug('InfrastructureManager Factory -> Connect received -> host [%s]', connection.host);

    if (connection.uuid) {
      connection.state = 'disconnected';

      const currentConnectionIndex = this.dataStore.connections.findIndex((obj) => {
        return obj.uuid === connection.uuid;
      });

      this.dataStore.connections[currentConnectionIndex] = connection;

    } else {
      // Check if connection already exists
      if (this.dataStore.connections.filter(obj => {
        return obj.type === connection.type && obj.host === connection.host;
      }).length > 0) {
        this.logger.error('Connections Factory -> Error while setting new connection -> type[%s], host [%s] -> Connection already exists',
          connection.type, connection.host);
        this.Toastr.error('Node (' + connection.host + ') already exists. Please modify the existing connection properties or' +
          ' ReScan the node.', 'Error creating connection');
        return null;
      }

      connection.uuid = uuidv4();

      if (connection.type === 'linux') this.setNewConnectionLinux(connection);
      if (connection.type === 'snmp') this.setNewConnectionSNMP(connection);
      if (connection.type === 'vmware') this.setNewConnectionVirtual(connection);
      if (connection.type === 'netapp') this.setNewConnectionNetApp(connection);
    }

    if (connection.save) this.saveConnection(connection);

    if (connection.type === 'netapp') this.InfrastructureManagerNetApp.getNetAppData(connection);
    if (connection.type === 'vmware') this.InfrastructureManagerVMWare.getVMwareData(connection);
    if (connection.type === 'windows' || connection.type === 'linux' || connection.type === 'snmp') {
      this.socket.emit('[new-session]', {
        type: 'smanager',
        host: connection.host,
        port: connection.port,
        credential: connection.credential,
        uuid: connection.uuid
      });
    }

    this.setActiveConnection(connection.uuid);
  }


  /**
   * Add new Linux connection to connections array
   */
  setNewConnectionLinux(connection: IMConnection, initialized?): void {
    if (initialized) {
      this.dataStore.connections.push(connection);
    } else {
      this.dataStore.connections.push({
        uuid: connection.uuid,
        host: connection.host,
        port: connection.port,
        description: connection.description,
        credential: connection.credential,
        type: connection.type,
        autologin: connection.autologin,
        save: connection.save,
        state: 'disconnected'
      });
    }

    // broadcast data to subscribers
    this.$connections.next(Object.assign({}, this.dataStore).connections);
  }

  /**
   * Add new SNMP connection to connections array
   */
  setNewConnectionSNMP(connection: IMConnection, initialized?): void {
    if (initialized) {
      this.dataStore.connections.push(connection);
    } else {
      this.dataStore.connections.push({
        uuid: connection.uuid,
        host: connection.host,
        port: connection.port,
        description: connection.description,
        credential: connection.credential,
        type: connection.type,
        autologin: connection.autologin,
        save: connection.save,
        state: 'disconnected',
        oids: connection.oids,
        community: connection.community
      });
    }

    // broadcast data to subscribers
    this.$connections.next(Object.assign({}, this.dataStore).connections);
  }

  /**
   * Add new Virtual connection to connections array
   */
  setNewConnectionVirtual(connection: IMConnection, initialized?): void {
    if (initialized) {
      this.dataStore.connections.push(connection);
    } else {
      this.dataStore.connections.push({
        uuid: connection.uuid,
        host: connection.host,
        port: connection.port,
        description: connection.description,
        credential: connection.credential,
        type: connection.type,
        autologin: connection.autologin,
        save: connection.save,
        state: 'disconnected'
      });
    }

    // broadcast data to subscribers
    this.$connections.next(Object.assign({}, this.dataStore).connections);
  }

  /**
   * Add new NetApp connection to connections array
   */
  setNewConnectionNetApp(connection: IMConnection, initialized?): void {
    if (initialized) {
      this.dataStore.connections.push(connection);
    } else {
      this.dataStore.connections.push({
        uuid: connection.uuid,
        host: connection.host,
        port: connection.port,
        description: connection.description,
        credential: connection.credential,
        type: connection.type,
        autologin: connection.autologin,
        save: connection.save,
        state: 'disconnected'
      });
    }

    // broadcast data to subscribers
    this.$connections.next(Object.assign({}, this.dataStore).connections);
  }

  /**
   * Save connection to config file
   */
  saveConnection(connection: IMConnection): void {
    if (!connection) throw new Error('connection_not_found');

    this.logger.debug('Connections Factory [%s] -> Saving connection -> type [%s], host [%s]',
      connection.uuid, connection.type, connection.host);

    const configFile = 'applications/infrastructure-manager/config.json';

    this.FileSystem.saveConfigFile(connection, configFile, false).subscribe(
      () => {
        this.logger.debug('Infrastructure Manager Factory [%s] -> Saved connection successfully -> host [%s]',
          connection.uuid, connection.host);
      },
      error => {
        this.logger.error('Infrastructure Manager [%s] -> Error while saving connection -> host [%s] -> ',
          connection.uuid, connection.host, error);
        this.Toastr.error('Error while saving connection.', 'Infrastructure Manager');
      });

  }
}
