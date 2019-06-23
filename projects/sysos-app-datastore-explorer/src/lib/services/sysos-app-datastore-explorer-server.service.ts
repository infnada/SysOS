import {Injectable} from '@angular/core';

import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {NGXLogger} from 'ngx-logger';

import {SysOSFile} from '@sysos/libs-types';
import {SysosLibsFileSystemService} from '@sysos/libs-file-system';
import {SysosLibsModalService} from '@sysos/libs-modal';
import {SysosLibsVmwareService} from '@sysos/libs-vmware';

import {SysosAppDatastoreExplorerService} from './sysos-app-datastore-explorer.service';

@Injectable({
  providedIn: 'root'
})
export class SysosAppDatastoreExplorerServerService {
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

  constructor(private logger: NGXLogger,
              private Toastr: ToastrService,
              private FileSystem: SysosLibsFileSystemService,
              private Modal: SysosLibsModalService,
              private VMWare: SysosLibsVmwareService,
              private DatastoreExplorer: SysosAppDatastoreExplorerService) {
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
    this.logger.debug('DatastoreExplorer -> datastore-explorer_session__file_download -> src [], dst [], connectionUuid []', src, dst, connectionUuid);
    // TODO
  }

  reloadPath(connectionUuid: string, path?: string): void {
    this.Modal.openLittleModal('PLEASE WAIT', 'Getting data...', '.window--datastore-explorer .window__main', 'plain');

    this.VMWare.getFilesDataFromDatastore(
      this.DatastoreExplorer.getConnectionByUuid(connectionUuid).credential,
      this.DatastoreExplorer.getConnectionByUuid(connectionUuid).host,
      this.DatastoreExplorer.getConnectionByUuid(connectionUuid).port,
      this.DatastoreExplorer.getConnectionByUuid(connectionUuid).datastoreId,
      this.DatastoreExplorer.getConnectionByUuid(connectionUuid).name,
      (path ? path : this.dataStore.currentPath)
    ).then((data) => {
      if (data.status === 'error') throw new Error('Failed to get Datastore files');

      console.log(data);

      const obj = data.data[0].propSet.info.result;

      delete obj.datastore;
      delete obj.folderPath;
      delete obj.xsi_type;

      data = Object.keys(obj).map((key) => {
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

      this.dataStore.currentData = data;

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
