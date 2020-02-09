import {Injectable} from '@angular/core';

import {BehaviorSubject, Observable, Subject} from 'rxjs';

import {MatDialogRef} from '@anyopsos/lib-angular-material';
import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {AnyOpsOSLibServiceInjectorService} from '@anyopsos/lib-service-injector';
import {AnyOpsOSLibFileSystemService} from '@anyopsos/lib-file-system';
import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';
import {AnyOpsOSLibVmwareSoapApiHelpersService} from '@anyopsos/lib-vmware';
import {AnyOpsOSLibNetappService} from '@anyopsos/lib-netapp';
import {VMWareDatastore} from '@anyopsos/module-vmware';
import {NetAppVolume, NetAppVserver} from '@anyopsos/module-netapp';
import {DataObject} from '@anyopsos/backend/app/types/data-object';
import {AnyOpsOSFile} from '@anyopsos/backend/app/types/anyopsos-file';


import {AnyOpsOSAppDatastoreExplorerService} from './anyopsos-app-datastore-explorer.service';
import {DatastoreExplorerConnection} from '../types/datastore-explorer-connection';




@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSAppDatastoreExplorerServerService {
  private InfrastructureManagerObjectHelper;

  private subjectGoPathBack: Subject<void> = new Subject();
  private subjectFileProgress: Subject<void> = new Subject();
  private subjectLoadingData: Subject<boolean> = new Subject();

  private $currentPath: BehaviorSubject<string>;
  private $currentData: BehaviorSubject<AnyOpsOSFile[]>;
  private $viewAsList: BehaviorSubject<boolean>;
  private $search: BehaviorSubject<{ fileName: string; }>;
  private dataStore: {  // This is where we will store our data in memory
    currentPath: string,
    currentData: AnyOpsOSFile[],
    viewAsList: boolean,
    search: { fileName: string; }
  };
  currentPath: Observable<string>;
  currentData: Observable<AnyOpsOSFile[]>;
  viewAsList: Observable<boolean>;
  search: Observable<{ fileName: string; }>;

  constructor(private readonly logger: AnyOpsOSLibLoggerService,
              private readonly serviceInjector: AnyOpsOSLibServiceInjectorService,
              private readonly LibFileSystem: AnyOpsOSLibFileSystemService,
              private readonly LibModal: AnyOpsOSLibModalService,
              private readonly LibVmwareSoapApiHelpersService: AnyOpsOSLibVmwareSoapApiHelpersService,
              private readonly DatastoreExplorer: AnyOpsOSAppDatastoreExplorerService) {
    this.InfrastructureManagerObjectHelper = this.serviceInjector.get('AnyOpsOSAppInfrastructureManagerObjectHelperService');

    this.dataStore = {currentPath: '/', currentData: [], viewAsList: false, search: {fileName: null}};
    this.$currentPath = new BehaviorSubject(this.dataStore.currentPath);
    this.$currentData = new BehaviorSubject(this.dataStore.currentData);
    this.$viewAsList = new BehaviorSubject(this.dataStore.viewAsList);
    this.$search = new BehaviorSubject(this.dataStore.search);
    this.currentPath = this.$currentPath.asObservable();
    this.currentData = this.$currentData.asObservable();
    this.viewAsList = this.$viewAsList.asObservable();
    this.search = this.$search.asObservable();
  }

  downloadFileToanyOpsOS(src: string, dst: string, connectionUuid: string): void {
    this.logger.debug('Datastore Explorer', 'datastore-explorer_session__file_download', arguments);
    // TODO
  }

  async reloadPath(connectionUuid: string, path?: string): Promise<void> {
    const loggerArgs = arguments;

    this.subjectLoadingData.next(true);

    const connection: DatastoreExplorerConnection = this.DatastoreExplorer.getConnectionByUuid(connectionUuid);

    const littleModalRef: MatDialogRef<any> = await this.LibModal.openLittleModal(this.DatastoreExplorer.serverBodyContainer, 'PLEASE WAIT', 'Getting data...');

    return Promise.resolve().then(() => {
      if (connection.type === 'vmware') {
        const datastore: DataObject & { info: { data: VMWareDatastore } } = connection.data.obj;

        return this.LibVmwareSoapApiHelpersService.getFilesDataFromDatastore(
          connection.uuid,
          `datastoreBrowser-${datastore.info.obj.name}`,
          datastore.name,
          (path ? path : this.dataStore.currentPath)
        );
      }

      if (connection.type === 'netapp') {
        const volume: DataObject & { info: { data: NetAppVolume } } = connection.data.obj;
        const vServer: DataObject & { info: { data: NetAppVserver } } = this.InfrastructureManagerObjectHelper.getParentObjectByType(connectionUuid, 'vserver', volume.info.parent);

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
        obj = FilesDataFromDatastoreResult.data.data[0].propSet[0].info[0].result[0].file;

        delete obj.datastore;
        delete obj.folderPath;
        delete obj.xsi_type;

        returnData = Object.keys(obj).map((key) => {
          const toReturn = obj[key];

          toReturn.fileName = toReturn.path;

          if (toReturn.xsi_type === 'FolderFileInfo') {
            toReturn.longName = `d--------- ${toReturn.fileName}`;
          } else {
            toReturn.longName = `---------- ${toReturn.fileName}`;
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

          toReturn.fileName = toReturn.name;

          if (toReturn['file-type'] === 'directory') {
            toReturn.longName = `d--------- ${toReturn.fileName}`;
          } else {
            toReturn.longName = `---------- ${toReturn.fileName}`;
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

      this.subjectLoadingData.next(false);
      this.LibModal.closeModal(littleModalRef.id);

    }).catch(error => {
      this.logger.error('DatastoreExplorer', 'Error while getting fileSystemPath -> ', loggerArgs, error);
      this.LibModal.closeModal(littleModalRef.id);
    });

  }

  toggleView(): void {
    this.dataStore.viewAsList = !this.dataStore.viewAsList;

    // broadcast data to subscribers
    this.$viewAsList.next(Object.assign({}, this.dataStore).viewAsList);
  }

  setSearch(data: string): void {
    this.dataStore.search = {fileName: data};

    // broadcast data to subscribers
    this.$search.next(Object.assign({}, this.dataStore).search);
  }

  sendGoPathBack(): void {
    this.subjectGoPathBack.next();
  }

  getObserverGoPathBack(): Observable<void> {
    return this.subjectGoPathBack.asObservable();
  }

  getObserverLoadingData(): Observable<boolean> {
    return this.subjectLoadingData.asObservable();
  }

  sendFileProgress(data): void {
    this.subjectFileProgress.next(data);
  }

  getObserverFileProgress(): Observable<any> {
    return this.subjectFileProgress.asObservable();
  }
}
