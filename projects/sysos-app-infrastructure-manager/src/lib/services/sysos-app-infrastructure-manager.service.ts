import {Injectable} from '@angular/core';

import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {NGXLogger} from 'ngx-logger';
import {ToastrService} from 'ngx-toastr';
import {Socket} from 'ngx-socket-io';
import {v4 as uuidv4} from 'uuid';

import {SysosLibModalService} from '@sysos/lib-modal';
import {SysosLibFileSystemService} from '@sysos/lib-file-system';

import {IMConnection} from '../types/imconnection';
import {IMLink} from '../types/imlink';
import {IMNode} from '../types/imnode';
import {VMWareDatastore} from '../types/vmware-datastore';

@Injectable({
  providedIn: 'root'
})
export class SysosAppInfrastructureManagerService {
  private linksMap: IMLink[];

  private subjectConnectGetData = new Subject<any>();

  private $connections: BehaviorSubject<IMConnection[]>;
  private $activeConnection: BehaviorSubject<string>;
  private $treeData: BehaviorSubject<IMNode[]>;
  private dataStore: {  // This is where we will store our data in memory
    connections: IMConnection[],
    activeConnection: string,
    treeData: IMNode[]
  };
  connections: Observable<any>;
  activeConnection: Observable<any>;
  treeData: Observable<any>;

  constructor(private logger: NGXLogger,
              private Toastr: ToastrService,
              private socket: Socket,
              private Modal: SysosLibModalService,
              private FileSystem: SysosLibFileSystemService) {
    this.dataStore = {connections: [], activeConnection: null, treeData: []};
    this.$connections = new BehaviorSubject([]) as BehaviorSubject<IMConnection[]>;
    this.$activeConnection = new BehaviorSubject(null) as BehaviorSubject<string>;
    this.$treeData = new BehaviorSubject([]) as BehaviorSubject<IMNode[]>;
    this.connections = this.$connections.asObservable();
    this.activeConnection = this.$activeConnection.asObservable();
    this.treeData = this.$treeData.asObservable();
  }

  /**
   * getTreeData
   * @description Extract all connections data and prepares an object usable by MatTreeFlatDataSource
   */
  getTreeData(): IMNode[] {
    const treeData = [
      {
        name: 'Storage',
        type: 'storage',
        children: []
      },
      {
        name: 'Virtual',
        type: 'virtual',
        children: []
      }
    ];

    // Set treeData for storage
    this.getConnectionsByType('netapp').forEach((storage, sti) => {
      const storageObject: IMNode = {
        name: storage.data.Base.name,
        data: {
          uuid: storage.uuid
        },
        type: 'netapp'
      };

      if (!storage.data.Vservers) return;
      storage.data.Vservers.forEach((vserver, vsi) => {
        const vserverObject: IMNode = {
          name: vserver['vserver-name'],
          data: {
            uuid: storage.uuid,
            vserver
          },
          type: 'vserver'
        };

        // Set Vservers as children
        if (!storageObject.children) storageObject.children = [];
        storageObject.children[vsi] = vserverObject;

        if (!vserver.Volumes) return;
        vserver.Volumes.forEach((volume, voi) => {
          const volumeObject: IMNode = {
            name: volume['volume-id-attributes'].name,
            data: {
              uuid: storage.uuid,
              vserver,
              volume
            },
            type: 'volume'
          };

          // Set Volumes as children
          if (!storageObject.children[vsi].children) storageObject.children[vsi].children = [];
          storageObject.children[vsi].children[voi] = volumeObject;

          if (!volume.Snapshots) return;
          volume.Snapshots.forEach((snapshot, sni) => {
            const snapshotObject: IMNode = {
              name: snapshot.name,
              data: {
                uuid: storage.uuid,
                vserver,
                volume,
                snapshot
              },
              type: 'snapshot'
            };

            // Set Snapshots as children
            if (!storageObject.children[vsi].children[voi].children) storageObject.children[vsi].children[voi].children = [];
            storageObject.children[vsi].children[voi].children[sni] = snapshotObject;
          });
        });
      });

      treeData[0].children[sti] = storageObject;
    });

    // Recursively for virtual data
    const getChildren = (virtual: IMConnection, current): void => {
      delete current.kind;

      current.type = current.obj.type;
      current.data = {
        uuid: virtual.uuid
      };
      current.children = virtual.data.Data.filter(obj => {
        return obj.parent && obj.parent.name === current.obj.name;
      });

      // Move all object data into data property
      Object.keys(current).forEach((key) => {
        if (['children', 'data', 'type', 'name', 'parent', 'obj'].includes(key)) return;

        current.data[key] = JSON.parse(JSON.stringify(current[key]));
      });

      // Recursively get children
      current.children.forEach(child => {
        getChildren(virtual, child);
      });

    };

    // Set treeData for virtual
    this.getConnectionsByType('vmware').forEach((virtual, vii) => {
      const virtualObject: IMNode = {
        name: virtual.host,
        data: {
          uuid: virtual.uuid
        },
        type: 'vmware'
      };

      // Virtual connection not initialized
      if (!virtual.data || !virtual.data.Data) return treeData[1].children[vii] = virtualObject;

      // Get main parent object
      virtualObject.children = [virtual.data.Data.find(obj => {
        return obj.parent === null;
      })];

      getChildren(virtual, virtualObject.children[0]);

      treeData[1].children[vii] = virtualObject;
    });

    return treeData;
  }

  getConnectionsByType(type: string): IMConnection[] {
    return this.dataStore.connections.filter(obj => {
      return obj.type === type;
    });
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

  /**
   * Connections
   */

  /**
   * @Description
   * Called when application is initialized
   */
  initConnections(): void {
    this.FileSystem.getConfigFile('applications/infrastructure-manager/config.json').subscribe(
      (res: IMConnection[]) => {
        this.logger.info('Infrastructure Manager Factory -> Get connections successfully');

        res.forEach((connection) => {
          connection.state = 'disconnected';

          this.setConnectionByType(connection, true);

          this.initializeConnection(connection);
        });

        // broadcast data to subscribers
        this.connectionsUpdated();
      },
      error => {
        this.logger.error('Infrastructure Manager Factory -> Error while getting connections -> ', error);
        return this.Toastr.error('Error getting connections.', 'Infrastructure Manager');
      });
  }

  initLinksMap(): void {
    this.FileSystem.getConfigFile('applications/infrastructure-manager/links.json').subscribe(
      (res: IMLink[]) => {
        this.logger.info('Infrastructure Manager Factory -> Get linksMap successfully');

        this.linksMap = res;
      },
      error => {
        this.logger.error('Infrastructure Manager Factory -> Error while getting linksMap -> ', error);
        return this.Toastr.error('Error getting linksMap.', 'Infrastructure Manager');
      });
  }

  /**
   * @Description
   * Called when user starts a new connection
   */
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
        this.Toastr.error(`Node (${connection.host}) already exists. Please modify the existing connection properties or ReScan the node.`, 'Error creating connection');
        return null;
      }

      connection.uuid = uuidv4();

      this.setConnectionByType(connection);
    }

    this.connectionsUpdated();

    // Save initial data then initialize
    Promise.resolve().then(() => {
      if (connection.save) return this.saveConnection(connection);

      return;
    }).then(() => {
      this.initializeConnection(connection);

      this.setActiveConnection(connection.uuid);
    });

  }

  setConnectionByType(connection: IMConnection, initialized?: boolean): void {
    if (connection.type === 'linux') this.setNewConnectionLinux(connection, initialized);
    if (connection.type === 'snmp') this.setNewConnectionSNMP(connection, initialized);
    if (connection.type === 'vmware') this.setNewConnectionVirtual(connection, initialized);
    if (connection.type === 'netapp') this.setNewConnectionNetApp(connection, initialized);
  }

  initializeConnection(connection: IMConnection) {
    if (connection.type === 'netapp') this.subjectConnectGetData.next(connection);
    if (connection.type === 'vmware') this.subjectConnectGetData.next(connection);
    if (connection.type === 'windows' || connection.type === 'linux' || connection.type === 'snmp') {
      this.socket.emit('[new-session]', {
        type: 'smanager',
        host: connection.host,
        port: connection.port,
        credential: connection.credential,
        uuid: connection.uuid
      });
    }
  }

  /**
   * Add new Linux connection to connections array
   */
  setNewConnectionLinux(connection: IMConnection, initialized?: boolean): void {
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
  }

  /**
   * Add new SNMP connection to connections array
   */
  setNewConnectionSNMP(connection: IMConnection, initialized?: boolean): void {
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
  }

  /**
   * Add new Virtual connection to connections array
   */
  setNewConnectionVirtual(connection: IMConnection, initialized?: boolean): void {
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
        data: {
          Base: {
            name: connection.host
          }
        },
        state: 'disconnected'
      });
    }
  }

  /**
   * Add new NetApp connection to connections array
   */
  setNewConnectionNetApp(connection: IMConnection, initialized?: boolean): void {
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
        data: {
          Base: {
            name: connection.host
          }
        },
        state: 'disconnected'
      });
    }
  }

  /**
   * Save node links to config file
   */
  private saveLinksMap(): void {
    this.logger.debug('Connections Factory -> Saving linksMap');

    const configFile = 'applications/infrastructure-manager/links.json';

    this.FileSystem.saveConfigFile(this.linksMap, configFile, false).subscribe(
      () => {
        this.logger.debug('Infrastructure Manager Factory [%s] -> linksMap saved successfully');
      },
      error => {
        this.logger.error('Infrastructure Manager [%s] -> Error while saving linksMap -> ', error);
        this.Toastr.error('Error while saving linksMap.', 'Infrastructure Manager');
      });

  }

  /**
   * Save connection to config file
   */
  saveConnection(connection: IMConnection): Promise<any> {
    if (!connection) throw new Error('connection_not_found');

    this.logger.debug('Connections Factory [%s] -> Saving connection -> type [%s], host [%s]',
      connection.uuid, connection.type, connection.host);

    const configFile = 'applications/infrastructure-manager/config.json';

    return this.FileSystem.saveConfigFile(connection, configFile, false).toPromise().then(
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

  disconnectConnection(uuid?: string): void {
    if (!uuid) uuid = this.dataStore.activeConnection;

    this.logger.debug('Infrastructure Manager [%s] -> Disconnecting connection', uuid);

    if (this.getConnectionByUuid(uuid).type === 'linux') {
      this.socket.emit('[disconnect-session]', {
        type: 'linux',
        uuid
      });
    }

    this.getConnectionByUuid(uuid).state = 'disconnected';

    // broadcast data to subscribers
    this.connectionsUpdated();
  }

  deleteConnection(uuid?: string): void {
    if (!uuid) uuid = this.dataStore.activeConnection;

    const configFile = 'applications/infrastructure-manager/config.json';

    this.Modal.openRegisteredModal('question', '.window--infrastructure-manager .window__main',
      {
        title: 'Delete connection ' + this.getConnectionByUuid(uuid).description,
        text: 'Remove the selected connection from the inventory?'
      }
    ).then((modalInstance) => {
      modalInstance.result.then((result: boolean) => {
        if (result === true) {

          this.logger.debug('Infrastructure Manager [%s] -> Deleting connection', uuid);

          this.disconnectConnection(uuid);
          this.setActiveConnection(null);

          this.FileSystem.deleteConfigFromFile(uuid, configFile).subscribe(
            () => {
              this.dataStore.connections = this.dataStore.connections.filter((connection) => {
                return connection.uuid !== uuid;
              });

              // broadcast data to subscribers
              this.connectionsUpdated();

              this.logger.debug('Infrastructure Manager [%s] -> Connection deleted successfully', uuid);
            },
            error => {
              this.logger.error('Infrastructure Manager [%s] -> Error while deleting connection -> ', uuid, error);
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

    this.Modal.openRegisteredModal('question', '.window--infrastructure-manager .window__main',
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

  refreshConnection(uuid?: string): void {
    if (!uuid) uuid = this.dataStore.activeConnection;

    this.connect(this.getConnectionByUuid(uuid));
  }

  /**
   * SHARED
   */
  /**
   * @description
   * Return a link if found
   */
  getLinkByStorageJunctionPath(virtualUuid: string, volume: string, junctionPath: string): IMLink[] {

    // Get Datastore name by Junction Path
    return this.linksMap.filter((obj) => {
      return obj.storage === virtualUuid && obj.volume === volume && obj.junction_path === junctionPath;
    });
  }

  /**
   * @description
   * Return a link if found
   *
   * @params
   */
  getLinkByVMwareDatastore(virtualUuid: string, esxiDatastore: string): IMLink[] {
    return this.linksMap.filter((obj) => {
      return obj.virtual === virtualUuid && obj.esxi_datastore === esxiDatastore;
    });
  }

  /**
   * @description check link between storage and virtual nodes
   */
  // TODO: some storages could have the same LIF IP!!! and links will be wrong
  checkLinkBetweenManagedNodes(type: string, uuid: string): void {

    /*const connection = this.getConnectionByUuid(uuid);

    if (type === 'vmware') {

      // Get all connection datastores
      this.InfrastructureManagerVMWare.getObjectByType(uuid, 'Datastore').forEach((datastore: VMWareDatastore) => {

        if (datastore['summary.type'] === 'VMFS') return;

        // Check if any storage volume contains the datastore remotePath as a volume junction path
        this.getConnectionsByType('storage').forEach((storage) => {

          // Checking for NetApp storage
          if (storage.type === 'netapp') {

            // check if storage have any interface that match the datastore.remoteHost and datastore.type
            const foundInterface = storage.data.Ifaces.netifaces.filter((obj) => {
              return obj.address ===  datastore.info.nas.remoteHost &&
                     obj['data-protocols']['data-protocols'] === (datastore.info.nas.type === 'NFS41' ? 'nfs' : datastore.info.nas.type);
            })[0];

            // If not found any storage interface matching, return
            if (!foundInterface) return;

            // Search any Data Vservers with allowed protocol that match the datastore.type
            const foundVserver = storage.data.Vservers.filter((obj) => {
              return obj['vserver-type'] === 'data' &&
                     obj['vserver-name'] === foundInterface.vserver &&
                     obj['allowed-protocols'].protocol === (datastore.info.nas.type === 'NFS41' ? 'nfs' : datastore.info.nas.type);
            })[0];

            if (!foundVserver) return;

            // Search for each Volume containing as a junction path the current datastore remotePath
            const foundVolume = foundVserver.Volumes.filter((obj) => {
              return obj['volume-id-attributes']['junction-path'] === datastore.info.nas.remotePath;
            })[0];

            if (!foundVolume) return;

            // TODO: CHECK VOLUME EXPORTS that match ESXi host

            // Link found!
            this.linksMap.push({
              virtual: uuid,
              esxi_datastore: datastore.obj.name,
              storage: storage.uuid,
              vserver: foundVserver.uuid,
              volume: foundVolume['volume-id-attributes'].uuid,
              junction_path: datastore.info.nas.remotePath
            });

            this.logger.debug('Infrastructure Manager [%s] -> New link found when scanning a vCenter node. -> datastore [%s], junction [%s]',
              connection.uuid, datastore.name, datastore.info.nas.remotePath);

          // end NetApp
          }
        // end storages
        });
      // end datastore
      });
    // end vmware
    }

    if (type === 'netapp') {

      // Get all vmware connections
      this.getConnectionsByType('vmware').forEach((virtual) => {

        // Get all vmware datastores
        virtual.data.Datastores.forEach((datastore) => {

          if (datastore.summary.type === 'VMFS') return;

          // check if connection have any interface that match the vmware datastore.remoteHost
          // and datastore.type
          const foundInterface = connection.data.Ifaces.netifaces.filter((obj) => {
            return obj.address === datastore.info.nas.remoteHost &&
                   obj['data-protocols']['data-protocol'] === (datastore.info.nas.type === 'NFS41' ? 'nfs' : datastore.info.nas.type);
          })[0];

          // If not found any storage interface matching, return
          if (!foundInterface) return;

          const foundVserver = connection.data.Vservers.filter((obj) => {
            return obj['vserver-type'] === 'data' &&
              obj['vserver-name'] === foundInterface.vserver &&
              obj['allowed-protocols'].protocol === (datastore.info.nas.type === 'NFS41' ? 'nfs' : datastore.info.nas.type);
          })[0];

          if (!foundVserver) return;

          // Search for each Volume containing as a junction path the current datastore remotePath
          const foundVolume = foundVserver.Volumes.filter((obj) => {
            return obj['volume-id-attributes']['junction-path'] === datastore.info.nas.remotePath;
          })[0];

          if (!foundVolume) return;

          // Link found!
          this.linksMap.push({
            virtual: virtual.uuid,
            esxi_datastore: datastore.obj.name,
            storage: uuid,
            vserver: foundVserver.uuid,
            volume: foundVolume['volume-id-attributes'].uuid,
            junction_path: datastore.info.nas.remotePath
          });

          this.logger.debug('Infrastructure Manager [%s] -> New link found when scanning a NetApp node. -> datastore [%s], junction [%s]',
            connection.uuid, datastore.name, datastore.info.nas.remotePath);

        // end datastore
        });
      // end virtual
      });
    // end netapp
    }
    this.saveLinksMap();*/

  }

  /**
   * @description We use this to bypass circular module dependency.
   * IM(component) -> IMS(this service) -> $(Obs) -> IM -> IMNetApp/IMVMWare (Since IMNetApp/IMVMWare already have IMS as dependency)
   * So we can't call IMNetApp/IMVMWare directly from IMS
   */
  getObserverConnectGetData(): Observable<any> {
    return this.subjectConnectGetData.asObservable();
  }

  /**
   * @description
   * Called manually every time any property/value from this.dataStore.connections is modified.
   * This allows us to set new treeData for MatTreeFlatDataSource.
   */
  connectionsUpdated() {
    if (JSON.stringify(this.dataStore.treeData) !== JSON.stringify(this.getTreeData())) {
      this.dataStore.treeData = this.getTreeData();

      // broadcast data to subscribers if treeData has changed aswell
      this.$treeData.next(Object.assign({}, this.dataStore).treeData);
    }

    // broadcast data to subscribers
    this.$connections.next(Object.assign({}, this.dataStore).connections);
  }
}
