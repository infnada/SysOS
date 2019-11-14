import {Injectable} from '@angular/core';

import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {SysosLibLoggerService} from '@sysos/lib-logger';

import {SysOSFile} from '@sysos/lib-types';
import {SysosLibServiceInjectorService} from '@sysos/lib-service-injector';
import {SysosLibFileSystemService} from '@sysos/lib-file-system';
import {SysosLibModalService} from '@sysos/lib-modal';
import {SysosLibVmwareService} from '@sysos/lib-vmware';
import {SysosLibNetappService} from '@sysos/lib-netapp';
import {ImDataObject, NetAppVolume, NetAppVserver, VMWareDatastore} from '@sysos/app-infrastructure-manager';

import {SysosAppDatastoreExplorerService} from './sysos-app-datastore-explorer.service';
import {DatastoreExplorerConnection} from '../types/datastore-explorer-connection';

@Injectable({
  providedIn: 'root'
})
export class SysosAppDatastoreExplorerServerService {
  private InfrastructureManagerObjectHelper;

  private subjectGoPathBack = new Subject<any>();
  private subjectFileProgress = new Subject<any>();

  private $currentPath: BehaviorSubject<string>;
  private $currentData: BehaviorSubject<SysOSFile[]>;
  private $viewAsList: BehaviorSubject<boolean>;
  private $search: BehaviorSubject<object>;
  private dataStore: {  // This is where we will store our data in memory
    currentPath: string,
    currentData: SysOSFile[],
    viewAsList: boolean,
    search: { filename: string }
  };
  currentPath: Observable<any>;
  currentData: Observable<any>;
  viewAsList: Observable<any>;
  search: Observable<any>;

  constructor(private logger: SysosLibLoggerService,
              private Toastr: ToastrService,
              private serviceInjector: SysosLibServiceInjectorService,
              private FileSystem: SysosLibFileSystemService,
              private Modal: SysosLibModalService,
              private VMWare: SysosLibVmwareService,
              private NetApp: SysosLibNetappService,
              private DatastoreExplorer: SysosAppDatastoreExplorerService) {
    this.InfrastructureManagerObjectHelper = this.serviceInjector.get('SysosAppInfrastructureManagerObjectHelperService');

    this.dataStore = {currentPath: '/', currentData: [], viewAsList: false, search: null};
    this.$currentPath = new BehaviorSubject('/') as BehaviorSubject<string>;
    this.$currentData = new BehaviorSubject([]) as BehaviorSubject<SysOSFile[]>;
    this.$viewAsList = new BehaviorSubject(false) as BehaviorSubject<boolean>;
    this.$search = new BehaviorSubject({filename: null}) as BehaviorSubject<object>;
    this.currentPath = this.$currentPath.asObservable();
    this.currentData = this.$currentData.asObservable();
    this.viewAsList = this.$viewAsList.asObservable();
    this.search = this.$search.asObservable();
  }

  downloadFileToSysOS(src: string, dst: string, connectionUuid: string): void {
    this.logger.debug('Datastore Explorer', 'datastore-explorer_session__file_download', arguments);
    // TODO
  }

  reloadPath(connectionUuid: string, path?: string): void {
    const connection: DatastoreExplorerConnection = this.DatastoreExplorer.getConnectionByUuid(connectionUuid);

    this.Modal.openLittleModal('PLEASE WAIT', 'Getting data...', '.window--datastore-explorer .window__main', 'plain').then(() => {

      if (connection.type === 'vmware') {
        const datastore: ImDataObject & { info: { data: VMWareDatastore } } = connection.data.obj;

        return this.VMWare.getFilesDataFromDatastore(
          connection,
          `datastoreBrowser-${datastore.info.obj.name}`,
          datastore.name,
          (path ? path : this.dataStore.currentPath)
        );
      }

      if (connection.type === 'netapp') {
        const volume: ImDataObject & { info: { data: NetAppVolume } } = connection.data.obj;
        const vServer: ImDataObject & { info: { data: NetAppVserver } } = this.InfrastructureManagerObjectHelper.getParentObjectByType(connectionUuid, 'vserver', volume.info.parent.name);

        return this.NetApp.getVolumeFiles(
          connection.credential,
          connection.host,
          connection.port,
          vServer.name,
          volume.name,
          (path ? path : this.dataStore.currentPath)
        );
      }

    }).then((FilesDataFromDatastoreResult) => {
      if (FilesDataFromDatastoreResult.status === 'error') throw new Error('Failed to get Datastore files');

      let obj;
      let returnData;

      if (connection.type === 'vmware') {
        obj = FilesDataFromDatastoreResult.data.data[0].propSet.info.result.file;

        delete obj.datastore;
        delete obj.folderPath;
        delete obj.xsi_type;

        returnData = Object.keys(obj).map((key) => {
          const toReturn = obj[key];

          toReturn.filename = toReturn.path;

          if (toReturn.xsi_type === 'FolderFileInfo') {
            toReturn.longname = `d--------- ${toReturn.filename}`;
          } else {
            toReturn.longname = `---------- ${toReturn.filename}`;
          }

          delete toReturn.xsi_type;
          delete toReturn.path;

          return toReturn;
        });
      }

      if (connection.type === 'netapp') {
        obj = FilesDataFromDatastoreResult.data;
        returnData = Object.keys(obj).map((key) => {
          console.log(obj, key, obj[key]);
          const toReturn = obj[key];

          toReturn.filename = toReturn.name;

          if (toReturn['file-type'] === 'directory') {
            toReturn.longname = `d--------- ${toReturn.filename}`;
          } else {
            toReturn.longname = `---------- ${toReturn.filename}`;
          }

          return toReturn;
        });
      }

      this.dataStore.currentData = returnData;

      // broadcast data to subscribers
      this.$currentData.next(Object.assign({}, this.dataStore).currentData);

      if (path) {
        this.dataStore.currentPath = path;

        // broadcast data to subscribers
        this.$currentPath.next(Object.assign({}, this.dataStore).currentPath);
      }

      this.Modal.closeModal('.window--datastore-explorer .window__main');

    }).catch(error => {
      this.logger.error('DatastoreExplorer -> Error while getting fileSystemPath -> ', error);
      this.Modal.closeModal('.window--datastore-explorer .window__main');
    });

  }

  toggleView(): void {
    this.dataStore.viewAsList = !this.dataStore.viewAsList;

    // broadcast data to subscribers
    this.$viewAsList.next(Object.assign({}, this.dataStore).viewAsList);
  }

  setSearch(data: string): void {
    this.dataStore.search = {filename: data};

    // broadcast data to subscribers
    this.$search.next(Object.assign({}, this.dataStore).search);
  }

  sendGoPathBack(): void {
    this.subjectGoPathBack.next();
  }

  getObserverGoPathBack(): Observable<any> {
    return this.subjectGoPathBack.asObservable();
  }

  sendFileProgress(data): void {
    this.subjectFileProgress.next(data);
  }

  getObserverFileProgress(): Observable<any> {
    return this.subjectFileProgress.asObservable();
  }
}
