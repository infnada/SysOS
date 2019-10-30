import {Injectable} from '@angular/core';

import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {SysosLibLoggerService} from '@sysos/lib-logger';
import {ToastrService} from 'ngx-toastr';
import {Socket} from 'ngx-socket-io';
import {v4 as uuidv4} from 'uuid';

import {SysosLibModalService} from '@sysos/lib-modal';
import {SysosLibApplicationService} from '@sysos/lib-application';
import {SysosLibFileSystemService} from '@sysos/lib-file-system';

import {IMConnection} from '../types/imconnection';
import {IMLink} from '../types/imlink';
import {IMNode} from '../types/imnode';
import {VMWareDatastore} from '../types/vmware-datastore';
import {VMWareObject} from '../types/vmware-object';
import {NetAppIface} from '../types/netapp-iface';
import {NetAppVserver} from '../types/netapp-vserver';
import {NetAppVolume} from '../types/netapp-volume';
import {IMDatastoreLink} from '../types/im-datastore-link';

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

  constructor(private logger: SysosLibLoggerService,
              private Toastr: ToastrService,
              private socket: Socket,
              private Modal: SysosLibModalService,
              private Applications: SysosLibApplicationService,
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
   * Extract all connections data and prepares an object usable by MatTreeFlatDataSource
   */
  getTreeData(): IMNode[] {
    const treeData: IMNode[] = [
      {
        name: 'Storage',
        type: 'storage',
        info: null,
        children: []
      },
      {
        name: 'Virtual',
        type: 'virtual',
        info: null,
        children: []
      },
      {
        name: 'Standalone',
        type: 'standalone',
        info: null,
        children: [
          {
            name: 'Linux',
            type: 'linux',
            info: null,
            children: []
          },
          {
            name: 'Windows',
            type: 'windows',
            info: null,
            children: []
          },
          {
            name: 'SNMP',
            type: 'snmp',
            info: null,
            children: []
          }
        ]
      }
    ];

    // Set treeData for storage
    this.getConnectionsByType('netapp').forEach((storage, sti) => {
      const storageObject: IMNode = {
        name: (storage.data ? storage.data.Base.name : storage.host),
        info: {
          uuid: storage.uuid
        },
        type: 'netapp'
      };

      if (storage.data && storage.data.Vservers) {
        storage.data.Vservers.forEach((vserver, vsi) => {
          const vserverObject: IMNode = {
            name: vserver['vserver-name'],
            info: {
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
              info: {
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
                info: {
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
      }

      treeData[0].children[sti] = storageObject;
    });

    // Recursively for virtual data
    const getChildren = (virtual: IMConnection, current): void => {
      delete current.kind;

      current.type = current.obj.type;
      current.info = {
        uuid: `${virtual.uuid};\u003c${current.obj.name}:${current.obj.type}\u003e`,
        mainUuid: virtual.uuid,
        data: {}
      };
      current.children = virtual.data.Data.filter(obj => {
        return obj.parent && obj.parent.name === current.obj.name || obj.parentVApp && obj.parentVApp.name === current.obj.name;
      });

      // Move all object data into data property
      Object.keys(current).forEach((key) => {
        if (['children', 'info'].includes(key)) return;

        if (['name', 'type'].includes(key)) {
          current.info[key] = JSON.parse(JSON.stringify(current[key]));
        } else if (['parent', 'obj'].includes(key)) {
          current.info[key] = JSON.parse(JSON.stringify(current[key]));
          setTimeout(() => {
            delete current[key];
          }, 0);
        } else {
          current.info.data[key] = JSON.parse(JSON.stringify(current[key]));
          setTimeout(() => {
            delete current[key];
          }, 0);

        }

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
        info: {
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

  /**
   * Return all connections matching 'type' type
   */
  getConnectionsByType(type: string): IMConnection[] {
    return this.dataStore.connections.filter(obj => {
      return obj.type === type;
    });
  }

  /**
   * Get current connection full object or MAIN object
   */
  getActiveConnection(returnMain: boolean = false): IMConnection {
    if (this.dataStore.activeConnection === null) return null;

    if (this.dataStore.activeConnection.includes(';')) {
      const topConnection = this.dataStore.connections.find(obj => obj.uuid === this.dataStore.activeConnection.substring(0, this.dataStore.activeConnection.indexOf(';')));

      // Return main object
      if (returnMain) return topConnection;

      // Return child object
      return topConnection.data.Data.find(obj => obj.info.uuid === this.dataStore.activeConnection);
    } else {
      return this.dataStore.connections.find(obj => obj.uuid === this.dataStore.activeConnection);
    }
  }

  /**
   * Get connection full object matching 'uuid'
   */
  getConnectionByUuid(uuid: string): IMConnection {
    if (!uuid) throw new Error('uuid');

    return this.dataStore.connections.find(obj => obj.uuid === uuid);
  }

  /**
   * Sets current/active connection
   */
  setActiveConnection(uuid: string): void {
    this.dataStore.activeConnection = uuid;

    // broadcast data to subscribers
    this.$activeConnection.next(Object.assign({}, this.dataStore).activeConnection);
  }

  /**
   * -------------------------
   *  New connections
   * -------------------------
   */

  /**
   * Called when application is initialized
   */
  initConnections(): void {
    this.FileSystem.getConfigFile('applications/infrastructure-manager/config.json').subscribe(
      (res: IMConnection[]) => {
        this.logger.info('Infrastructure Manager', 'Got connections successfully');

        res.forEach((connection) => {
          if (connection.type !== 'vmware' && connection.type !== 'netapp')connection.state = 'disconnected';

          this.setConnectionByType(connection, true);

          this.initializeConnection(connection);
        });

        // broadcast data to subscribers
        this.connectionsUpdated();
      },
      error => {
        this.logger.error('Infrastructure Manager', 'Error while getting connections', null, error);
        return this.Toastr.error('Error getting connections.', 'Infrastructure Manager');
      });
  }

  initLinksMap(): void {
    this.FileSystem.getConfigFile('applications/infrastructure-manager/links.json').subscribe(
      (res: IMLink[]) => {
        this.logger.info('Infrastructure Manager', 'Got linksMap successfully');

        this.linksMap = res;
      },
      error => {
        this.logger.error('Infrastructure Manager', 'Error while getting linksMap', null, error);
        return this.Toastr.error('Error getting linksMap.', 'Infrastructure Manager');
      });
  }

  /**
   * @Description
   * Called when user starts a new connection
   */
  connect(connection: IMConnection, saveOnly: boolean = false): void {
    if (!connection) throw new Error('connection_not_found');

    this.logger.debug('Infrastructure Manager', 'Connect received', arguments);

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
        this.logger.error('Infrastructure Manager', 'Error while setting new connection -> Connection already exists', arguments);
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
      if (!saveOnly) this.initializeConnection(connection);

      this.setActiveConnection(connection.uuid);
    });

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
   * "dispatcher"
   */
  setConnectionByType(connection: IMConnection, initialized?: boolean): void {
    if (connection.type === 'linux') this.setNewConnectionLinux(connection, initialized);
    if (connection.type === 'snmp') this.setNewConnectionSNMP(connection, initialized);
    if (connection.type === 'vmware') this.setNewConnectionVirtual(connection, initialized);
    if (connection.type === 'netapp') this.setNewConnectionNetApp(connection, initialized);
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
    this.logger.debug('Infrastructure Manager', 'Saving linksMap');

    const configFile = 'applications/infrastructure-manager/links.json';

    this.FileSystem.saveConfigFile(this.linksMap, configFile, false).subscribe(
      () => {
        this.logger.debug('Infrastructure Manager', 'linksMap saved successfully');
      },
      error => {
        this.logger.error('Infrastructure Manager', 'Error while saving linksMap', null, error);
        this.Toastr.error('Error while saving linksMap.', 'Infrastructure Manager');
      });

  }

  /**
   * -------------------------
   * Interact with connections
   * -------------------------
   */
  saveConnection(connection: IMConnection): Promise<any> {
    const loggerArgs = arguments;

    if (!connection) throw new Error('connection_not_found');

    this.logger.debug('Infrastructure Manager', 'Saving connection', arguments);

    const configFile = 'applications/infrastructure-manager/config.json';

    return this.FileSystem.saveConfigFile(connection, configFile, false).toPromise().then(
      () => {
        this.logger.debug('Infrastructure Manager', 'Saved connection successfully', loggerArgs);
      },
      error => {
        this.logger.error('Infrastructure Manager', 'Error while saving connection', loggerArgs, error);
        this.Toastr.error('Error while saving connection.', 'Infrastructure Manager');
      });

  }

  disconnectConnection(connectionUuid?: string): void {
    if (!connectionUuid) connectionUuid = this.dataStore.activeConnection;

    this.logger.debug('Infrastructure Manager', 'Disconnecting connection');

    if (this.getConnectionByUuid(connectionUuid).type === 'linux') {
      this.socket.emit('[disconnect-session]', {
        type: 'linux',
        connectionUuid
      });
    }

    this.getConnectionByUuid(connectionUuid).state = 'disconnected';

    // broadcast data to subscribers
    this.connectionsUpdated();
  }

  deleteConnection(connectionUuid?: string): void {
    const loggerArgs = arguments;

    if (!connectionUuid) connectionUuid = this.dataStore.activeConnection;

    const configFile = 'applications/infrastructure-manager/config.json';

    this.Modal.openRegisteredModal('question', '.window--infrastructure-manager .window__main',
      {
        title: `Delete connection ${this.getConnectionByUuid(connectionUuid).description}`,
        text: 'Remove the selected connection from the inventory?'
      }
    ).then((modalInstance) => {
      modalInstance.result.then((result: boolean) => {
        if (result === true) {

          this.logger.debug('Infrastructure Manager', 'Deleting connection', loggerArgs);

          this.disconnectConnection(connectionUuid);
          this.setActiveConnection(null);

          this.FileSystem.deleteConfigFromFile(connectionUuid, configFile).subscribe(
            () => {
              this.dataStore.connections = this.dataStore.connections.filter((connection) => {
                return connection.uuid !== connectionUuid;
              });

              // broadcast data to subscribers
              this.connectionsUpdated();

              this.logger.debug('Infrastructure Manager', 'Connection deleted successfully', loggerArgs);
            },
            error => {
              this.logger.error('Infrastructure Manager', 'Error while deleting connection', loggerArgs, error);
            });

        }
      });
    });

  }

  editConnection(connectionUuid?: string): void {
    if (!connectionUuid) connectionUuid = this.dataStore.activeConnection;

    if (this.getConnectionByUuid(connectionUuid).state === 'disconnected') {
      this.setActiveConnection(connectionUuid);
      this.disconnectConnection();
      return;
    }

    this.Modal.openRegisteredModal('question', '.window--infrastructure-manager .window__main',
      {
        title: `Edit connection ${this.getConnectionByUuid(connectionUuid).description}`,
        text: 'Your connection will be disconnected before editing it. Continue?'
      }
    ).then((modalInstance) => {
      modalInstance.result.then((result: boolean) => {
        if (result === true) {

          this.setActiveConnection(connectionUuid);
          this.disconnectConnection();

        }
      });
    });

  }

  refreshConnection(connectionUuid?: string): void {
    if (!connectionUuid) connectionUuid = this.dataStore.activeConnection;

    this.connect(this.getConnectionByUuid(connectionUuid));
  }

  /**
   * -------------------------
   * SHARED
   * -------------------------
   */

  /**
   *
   */
  openBackupsManager(connectionUuid: string, type: string, data: { [key: string]: any }) {
    this.logger.debug('Infrastructure Manager', 'Opening Backups Manager APP');

    this.Applications.openApplication('backups-manager', {
      data,
      type,
      credential: this.getConnectionByUuid(connectionUuid).credential,
      host: this.getConnectionByUuid(connectionUuid).host,
      port: this.getConnectionByUuid(connectionUuid).port
    });
  }

  /**
   * Return a link if found
   */
  getLinkByStorageJunctionPath(virtualUuid: string, volume: string, junctionPath: string): IMLink[] {

    // Get Datastore name by Junction Path
    return this.linksMap.filter((obj) => {
      return obj.storage === virtualUuid && obj.volume === volume && obj.junction_path === junctionPath;
    });
  }

  /**
   * Return a link if found
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
        this.getConnectionsByType('netapp').forEach((storage) => {

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
   * Check if datastore is linked to any managed storage
   */
  checkDatastoreLinkWithManagedStorage(datastoreObj: VMWareObject & { info: { data: VMWareDatastore } }): IMDatastoreLink[] {
    const results = [];

    this.getConnectionsByType('netapp').forEach((storageObj: IMConnection) => {

      // Checking for NetApp storage
      if (storageObj.type === 'netapp') {

        // check if storage have any interface that match the datastore.remoteHost and datastore.type
        const foundInterface = storageObj.data.Ifaces.netifaces.filter((ifaceObj: NetAppIface) => {
          return ifaceObj.address ===  datastoreObj.info.data.info.nas.remoteHost &&
            ifaceObj['data-protocols']['data-protocol'] === (
              datastoreObj.info.data.info.nas.type === 'NFS41' ||
              datastoreObj.info.data.info.nas.type === 'NFS' ? 'nfs' :
                datastoreObj.info.data.info.nas.type
            );
        })[0];

        // If not found any storage interface matching, return
        if (!foundInterface) return;

        // Search any Data Vservers with allowed protocol that match the datastore.type
        const foundVserver = storageObj.data.Vservers.filter((vserverObj: NetAppVserver) => {
          return vserverObj['vserver-type'] === 'data' &&
            vserverObj['vserver-name'] === foundInterface.vserver &&
            vserverObj['allowed-protocols'].protocol.includes(
              (datastoreObj.info.data.info.nas.type === 'NFS41' || datastoreObj.info.data.info.nas.type === 'NFS' ? 'nfs' : datastoreObj.info.data.info.nas.type)
            );
        })[0];

        if (!foundVserver) return;

        // Search for each Volume containing as a junction path the current datastore remotePath
        const foundVolume = foundVserver.Volumes.filter((volumeObj: NetAppVolume) => {
          return volumeObj['volume-id-attributes']['junction-path'] === datastoreObj.info.data.info.nas.remotePath;
        })[0];

        if (!foundVolume) return;

        // TODO: CHECK VOLUME EXPORTS that match ESXi host

        // Link found!
        results.push({
          storage: storageObj,
          vserver: foundVserver,
          volume: foundVolume
        });

      }

    });

    return results;

  }

  /**
   * We use this to bypass circular module dependency.
   * IM(component) -> IMS(this service) -> $(Obs) -> IM -> IMNetApp/IMVMWare (Since IMNetApp/IMVMWare already have IMS as dependency)
   * So we can't call IMNetApp/IMVMWare directly from IMS
   */
  getObserverConnectGetData(): Observable<any> {
    return this.subjectConnectGetData.asObservable();
  }

  /**
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


  /**
   * -------------------------
   * Weavescope graph
   * -------------------------
   */
  isTypeStacked(type) {
    return ['vmware', 'storage', 'Datacenter', 'ClusterComputeResource', 'StoragePod', 'VirtualApp', 'Network'].includes(type);
  }

  getShapeByType(type) {
    return (
      type === 'vmware' ? 'octagon' :
      type === 'Datacenter' ? 'heptagon' :
      type === 'ClusterComputeResource' || type === 'HostSystem' ? 'hexagon' :
      type === 'Folder' ? 'sheet' :
      type === 'VirtualApp' || type === 'VirtualMachine' ? 'circle' :
      type === 'StoragePod' || type === 'Datastore' ? 'cylinder' :
      type === 'VirtualDisk' ? 'dottedcylinder' :
      type === 'VmwareDistributedVirtualSwitch' || type === 'Network' ? 'triangle' :
      type === 'DistributedVirtualPortgroup' ? 'dottedtriangle' :
      type === 'ResourcePool' ? 'pentagon' :
      'dottedcylinder'
    );
  }

  setPseudoNodes(nodes) {
    nodes.nodes['pseudo:virtual:'] = {
      id: 'pseudo:virtual:',
      label: 'Virtual',
      labelMinor: 0,
      rank: 'virtual:',
      shape: 'square',
      stack: true,
      pseudo: true,
      adjacency: [
        'pseudo:virtual:'
      ]
    };

    nodes.nodes['pseudo:storage:'] = {
      id: 'pseudo:storage:',
      label: 'Storage',
      labelMinor: 0,
      rank: 'storage:',
      shape: 'square',
      stack: true,
      pseudo: true,
      adjacency: [
        'pseudo:storage:'
      ]
    };

    return nodes;
  }

  /**
   * Gets adjacent Parents from a node
   */
  getAdjacentParent(objData) {

    // Is main object. Connect to pseudo
    if (!objData.info) {
      return `pseudo:${(objData.type === 'vmware' ? 'virtual' : '')}:`;

      // Have parent connect to it
    } else if (objData.info.parent) {
      return `${objData.info.mainUuid};\u003c${objData.info.parent.name}:${objData.info.parent.type}\u003e`;

      // Don't have parent, connect to main object
    } else {
      return objData.info.mainUuid;
    }
  }

  /**
   * Gets adjacent Childrens from a node
   */
  getAdjacentChildrens(nodeId, objData, connectionNodes) {
    const adjacentChildrens = [];

    if (!objData.info) return adjacentChildrens;

    const childrens = connectionNodes.filter(obj => (obj.info && obj.info.parent && (obj.info.parent.type === objData.info.obj.type && obj.info.parent.name === objData.info.obj.name)));

    childrens.forEach((child) => {
      adjacentChildrens.push(`${child.info.mainUuid};\u003c${child.info.obj.name}:${child.info.obj.type}\u003e`);
    });

    return adjacentChildrens;
  }

  /**
   * Gets adjacent Datastores from a node
   */
  getAdjacentDatastores(objData) {
    const adjacentDatastores = [];

    if (objData.type === 'VirtualMachine' && objData.info.data.datastore.ManagedObjectReference) {
      // Connect to Datastores
      if (Array.isArray(objData.info.data.datastore.ManagedObjectReference)) {
        Array.isArray(objData.info.data.datastore.ManagedObjectReference.forEach((datastoreData) => {
          adjacentDatastores.push(`${objData.info.mainUuid};\u003c${datastoreData.name}:${datastoreData.type}\u003e`);
        }));
      } else {
        adjacentDatastores.push(`${objData.info.mainUuid};\u003c${objData.info.data.datastore.ManagedObjectReference.name}:${objData.info.data.datastore.ManagedObjectReference.type}\u003e`);
      }

      return adjacentDatastores;
    }

    return [];
  }

  /**
   * Special use/case
   * Since VM Disks are not connection objects, we inspect directly the VM to get the disks information.
   * Gets and returns nodes and adjacent Disks from VM object
   */
  getAdjacentDisks(nodes, objData) {
    const adjacentDisks = [];

    if (objData.type === 'VirtualMachine' && objData.info.data['config.hardware.device'].VirtualDevice) {

      objData.info.data['config.hardware.device'].VirtualDevice.forEach((device) => {

        if (device.xsi_type === 'VirtualDisk') {
          const diskId = `${objData.info.mainUuid};\u003c${device.backing.uuid}:${device.xsi_type}\u003e`;
          const datastoreId = `${objData.info.mainUuid};\u003c${device.backing.datastore.name}:${device.backing.datastore.type}\u003e`;

          adjacentDisks.push(diskId);

          // Set special VirtualDisk node
          nodes.nodes[diskId] = {
            id: diskId,
            nodeInfo: device,
            label: device.deviceInfo.label,
            labelMinor: device.xsi_type,
            rank: device.xsi_type + '/' + device.backing.diskMode,
            shape: this.getShapeByType(device.xsi_type),
            stack: false,
            metadata: [
              {
                id: 'kubernetes_node_type',
                label: 'Type',
                value: 'Deployment',
                priority: 1
              },
              {
                id: 'kubernetes_namespace',
                label: 'Namespace',
                value: 'inaregames-com',
                priority: 2
              },
              {
                id: 'kubernetes_created',
                label: 'Created',
                value: '2019-04-09T17:49:31Z',
                priority: 3,
                dataType: 'datetime'
              },
              {
                id: 'kubernetes_observed_generation',
                label: 'Observed gen.',
                value: 22,
                priority: 4,
                dataType: 'number'
              },
              {
                id: 'kubernetes_desired_replicas',
                label: 'Desired replicas',
                value: 1,
                priority: 5,
                dataType: 'number'
              },
              {
                id: 'pod',
                label: '# Pods',
                value: 1,
                priority: 6,
                dataType: 'number'
              },
              {
                id: 'kubernetes_strategy',
                label: 'Strategy',
                value: 'Recreate',
                priority: 7
              }
            ],
            metrics: [
              {
                id: 'docker_cpu_total_usage',
                label: 'CPU',
                format: 'percent',
                value: 0,
                priority: 1,
                samples: null,
                min: 0,
                max: 100,
                url: 0
              },
              {
                id: 'docker_memory_usage',
                label: 'Memory',
                format: 'filesize',
                value: 178925568,
                priority: 2,
                samples: null,
                min: 177053696,
                max: 4138717184,
                url: 0
              }
            ],
            adjacency: [
              // Datastore
              datastoreId
            ]
          };

          // Set Datastore node
          const currentAdjacentNode = this.getConnectionByUuid(objData.info.mainUuid).data.Data.find(obj => obj.info.uuid === datastoreId);

          nodes = this.setNode(nodes, currentAdjacentNode);
        }

      });

    }

    return {
      adjacentDisks,
      nodes
    };
  }

  /**
   * For each adjacent nodeId, get->set the node
   */
  getAdjacentNodes(nodes, nodeId, connectionNodes) {
    nodes.nodes[nodeId].adjacency.forEach((adjacentUuid) => {
      const currentAdjacentNode = connectionNodes.find(obj => (obj.info && obj.info.uuid) === adjacentUuid);

      if (currentAdjacentNode) nodes = this.setNode(nodes, currentAdjacentNode);
    });

    return nodes;
  }

  setNode(nodes, objData, detailed = false) {
    const nodeId = (objData.info ? objData.info.uuid : objData.uuid);

    // Invalid node type
    if (!nodeId) return nodes;

    /**
     * Set basic node info
     */

    nodes.nodes[nodeId] = {
      id: nodeId,
      nodeInfo: objData,
      label: (objData.name ? objData.name : objData.host),
      labelMinor: (objData.description ? objData.description : objData.type),
      rank: objData.type + '/' + (objData.info ? objData.info.obj.name : objData.host),
      shape: this.getShapeByType(objData.type),
      stack: this.isTypeStacked(objData.type),
      metadata: [
        {
          id: 'kubernetes_node_type',
          label: 'Type',
          value: 'Deployment',
          priority: 1
        },
        {
          id: 'kubernetes_namespace',
          label: 'Namespace',
          value: 'inaregames-com',
          priority: 2
        },
        {
          id: 'kubernetes_created',
          label: 'Created',
          value: '2019-04-09T17:49:31Z',
          priority: 3,
          dataType: 'datetime'
        },
        {
          id: 'kubernetes_observed_generation',
          label: 'Observed gen.',
          value: 22,
          priority: 4,
          dataType: 'number'
        },
        {
          id: 'kubernetes_desired_replicas',
          label: 'Desired replicas',
          value: 1,
          priority: 5,
          dataType: 'number'
        },
        {
          id: 'pod',
          label: '# Pods',
          value: 1,
          priority: 6,
          dataType: 'number'
        },
        {
          id: 'kubernetes_strategy',
          label: 'Strategy',
          value: 'Recreate',
          priority: 7
        }
      ],
      metrics: [
        {
          id: 'docker_cpu_total_usage',
          label: 'CPU',
          format: 'percent',
          value: 0,
          priority: 1,
          samples: null,
          min: 0,
          max: 100,
          url: 0
        },
        {
          id: 'docker_memory_usage',
          label: 'Memory',
          format: 'filesize',
          value: 178925568,
          priority: 2,
          samples: null,
          min: 177053696,
          max: 4138717184,
          url: 0
        }
      ],
      adjacency: [
        // Parent
        this.getAdjacentParent(objData),

        // HostSystem
        (objData.type === 'VirtualMachine' ? `${objData.info.mainUuid};\u003c${objData.info.data['runtime.host'].name}:${objData.info.data['runtime.host'].type}\u003e` : ''),
      ]
    };

    /**
     * ----------------------------
     */

    if (!detailed) {
      // Datastores adjacent
      nodes.nodes[nodeId].adjacency.push(...this.getAdjacentDatastores(objData));
    }

    /**
     * ----------------------------
     */
    if (detailed && objData.info) {
      const connectionNodes = this.getConnectionByUuid(objData.info.mainUuid).data.Data;

      // Childrens adjacent
      nodes.nodes[nodeId].adjacency.push(...this.getAdjacentChildrens(nodeId, objData, connectionNodes));

      // Set each adjacent node to nodes object
      nodes = this.getAdjacentNodes(nodes, nodeId, connectionNodes);

      // VM Disks adjacent and nodes
      const vmDisks = this.getAdjacentDisks(nodes, objData);

      nodes = vmDisks.nodes;
      nodes.nodes[nodeId].adjacency.push(...vmDisks.adjacentDisks);
    }

    return nodes;
  }

  setWeaveScopeNodes() {
    let nodes = {
      nodes: {}
    };

    const activeObject = this.getActiveConnection();

    // Return everything if no activeConnection. Set pseudo elements
    if (!activeObject)  {
      nodes = this.setPseudoNodes(nodes);

      const virtualConnections = this.getConnectionsByType('vmware');
      virtualConnections.forEach((virtual: IMConnection) => {
        nodes = this.setNode(nodes, virtual);

        // Get object childrens
        if (!virtual.data || !virtual.data.Data) return;

        virtual.data.Data.forEach((objData) => {
          nodes = this.setNode(nodes, objData);
        });
      });
    }

    if (activeObject)  {
      nodes = this.setNode(nodes, activeObject, true);
    }

    return nodes;
  }

  selectedNodeChange($event) {
    console.log($event);
  }
}
