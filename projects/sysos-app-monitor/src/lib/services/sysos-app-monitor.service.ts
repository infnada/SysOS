import {Injectable} from '@angular/core';

import {BehaviorSubject, Observable} from "rxjs";
import {v4 as uuidv4} from 'uuid';

import {SysosLibLoggerService} from "@sysos/lib-logger";
import {SysosLibModalService} from "@sysos/lib-modal";

import {Netdata} from "../types/netdata";
import {SysosLibFileSystemService} from "@sysos/lib-file-system/lib/sysos-lib-file-system.service";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class SysosAppMonitorService {

  private NETDATA;

  private $connections: BehaviorSubject<Netdata[]>;
  private $activeConnection: BehaviorSubject<string>;
  private dataStore: {  // This is where we will store our data in memory
    connections: Netdata[],
    activeConnection: string
  };
  connections: Observable<any>;
  activeConnection: Observable<any>;

  constructor(private logger: SysosLibLoggerService,
              private Modal: SysosLibModalService,
              private FileSystem: SysosLibFileSystemService,
              private Toastr: ToastrService) {

    this.dataStore = {connections: [], activeConnection: null};
    this.$connections = new BehaviorSubject([]) as BehaviorSubject<Netdata[]>;
    this.$activeConnection = new BehaviorSubject(null) as BehaviorSubject<string>;
    this.connections = this.$connections.asObservable();
    this.activeConnection = this.$activeConnection.asObservable();
  }

  setNetdata(NETDATA) {
    this.NETDATA = NETDATA;
  }

  getNetdata() {
    return this.NETDATA;
  }

  connect(data) {
    let uuid = uuidv4();

    this.dataStore.connections.push({
      uuid: uuid,
      url: data.url,
      description: data.description,
      credential: data.credential,
      autologin: data.autologin,
      save: data.save,
      type: data.type,
      state: 'connected'
    });

    this.dataStore.activeConnection = uuid;

    // broadcast data to subscribers
    this.$activeConnection.next(Object.assign({}, this.dataStore).activeConnection);
    this.$connections.next(Object.assign({}, this.dataStore).connections);
  }

  getConnectionByUuid(uuid: string): Netdata {
    if (!uuid) throw new Error('uuid');

    return this.dataStore.connections.find(obj => obj.uuid === uuid);
  }

  getActiveConnection(): Netdata {
    if (this.dataStore.activeConnection === null) return null;

    return this.dataStore.connections.find(obj => obj.uuid === this.dataStore.activeConnection);
  }

  setActiveConnection(uuid: string): void {
    this.dataStore.activeConnection = uuid;

    // broadcast data to subscribers
    this.$activeConnection.next(Object.assign({}, this.dataStore).activeConnection);
  }

  saveConnection(connection: Netdata): void {
    const loggerArgs = arguments;

    if (!connection) throw new Error('connection_not_found');

    const configFile = 'applications/monitor/config.json';

    this.logger.debug('Monitor', 'Saving connection', arguments);

    this.FileSystem.saveConfigFile(connection, configFile, false).subscribe(
      () => {
        this.logger.debug('Monitor', 'Saved connection successfully', loggerArgs);
      },
      error => {
        this.logger.error('Monitor', 'Error while saving connection', loggerArgs, error);
        this.Toastr.error('Error while saving connection.', 'Infrastructure Manager');
      });
  }

  disconnectConnection(uuid?: string): void {
    if (!uuid) uuid = this.dataStore.activeConnection;

    this.logger.debug('Monitor', 'Disconnecting connection', arguments);

    // TODO send to backend disconnect

    this.getConnectionByUuid(uuid).state = 'disconnected';

    // broadcast data to subscribers
    this.$connections.next(Object.assign({}, this.dataStore).connections);
  }

  deleteConnection(uuid?: string): void {
    const loggerArgs = arguments;

    if (!uuid) uuid = this.dataStore.activeConnection;

    const configFile = 'applications/monitor/config.json';

    this.Modal.openRegisteredModal('question', '.window--monitor .window__main',
      {
        title: 'Delete connection ' + this.getConnectionByUuid(uuid).description,
        text: 'Remove the selected connection from the inventory?'
      }
    ).then((modalInstance) => {
      modalInstance.result.then((result: boolean) => {
        if (result === true) {

          this.logger.debug('Monitor', 'Deleting connection', loggerArgs);

          this.disconnectConnection(uuid);
          this.setActiveConnection(null);

          this.FileSystem.deleteConfigFromFile(uuid, configFile).subscribe(
            () => {
              this.dataStore.connections = this.dataStore.connections.filter((connection) => {
                return connection.uuid !== uuid;
              });

              // broadcast data to subscribers
              this.$connections.next(Object.assign({}, this.dataStore).connections);

              this.logger.debug('Monitor', 'Connection deleted successfully', loggerArgs);
            },
            error => {
              this.logger.error('Monitor', 'Error while deleting connection', loggerArgs, error);
            });

        }
      });
    });
  }

  editConnection(uuid?: string): void {
    if (!uuid) uuid = this.dataStore.activeConnection;

    if (this.getConnectionByUuid(uuid).state === 'disconnected') {
      this.setActiveConnection(uuid);
      this.disconnectConnection();
      return;
    }

    this.Modal.openRegisteredModal('question', '.window--monitor .window__main',
      {
        title: 'Edit connection ' + this.getConnectionByUuid(uuid).description,
        text: 'Your connection will be disconnected before editing it. Continue?'
      }
    ).then((modalInstance) => {
      modalInstance.result.then((result: boolean) => {
        if (result === true) {

          this.setActiveConnection(uuid);
          this.disconnectConnection();

        }
      });
    });
  }

}