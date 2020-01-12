import {Component, Input, OnDestroy, OnInit} from '@angular/core';

import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {Application} from '@anyopsos/lib-application';
import {AnyOpsOSLibFileSystemUiService} from '@anyopsos/lib-file-system-ui';

import {AnyOpsOSAppDatastoreExplorerService} from '../../../services/anyopsos-app-datastore-explorer.service';
import {AnyOpsOSAppDatastoreExplorerServerService} from '../../../services/anyopsos-app-datastore-explorer-server.service';
import {AnyOpsOSAppDatastoreExplorerLocalService} from '../../../services/anyopsos-app-datastore-explorer-local.service';

@Component({
  selector: 'aade-body-exchange',
  templateUrl: './body-exchange.component.html',
  styleUrls: ['./body-exchange.component.scss']
})
export class BodyExchangeComponent implements OnDestroy, OnInit {
  @Input() application: Application;

  private destroySubject$: Subject<void> = new Subject();

  private activeConnection: string;
  private currentLocalPath: string;
  private currentRemotePath: string;

  viewExchange: boolean;
  filesExchange: {
    uuid: string,
    name: string,
    source: string,
    path: string,
    size: number,
    progress: number,
    exchange: string
  }[] = [];

  constructor(private FileSystemUi: AnyOpsOSLibFileSystemUiService,
              private DatastoreExplorer: AnyOpsOSAppDatastoreExplorerService,
              private DatastoreExplorerServer: AnyOpsOSAppDatastoreExplorerServerService,
              private DatastoreExplorerLocal: AnyOpsOSAppDatastoreExplorerLocalService) {
  }

  ngOnInit(): void {

    // Listen for viewExchange changes
    this.DatastoreExplorer.viewExchange
      .pipe(takeUntil(this.destroySubject$)).subscribe((view: boolean) => this.viewExchange = view);

    // Listen for activeConnection change
    this.DatastoreExplorer.activeConnection
      .pipe(takeUntil(this.destroySubject$)).subscribe((activeConnectionUuid: string) => this.activeConnection = activeConnectionUuid);

    // Listen for local currentPath changes
    this.DatastoreExplorerLocal.currentPath
      .pipe(takeUntil(this.destroySubject$)).subscribe((path: string) => this.currentLocalPath = path);

    // Listen for server currentPath changes
    this.DatastoreExplorerServer.currentPath
      .pipe(takeUntil(this.destroySubject$)).subscribe((path: string) => this.currentRemotePath = path);

    // Watcher sent by FileComponent
    this.FileSystemUi.getObserverDownloadRemoteFile()
      .pipe(takeUntil(this.destroySubject$)).subscribe((data) => this.onDownloadRemoteFile(data));

    // Watcher sent by FileComponent
    this.FileSystemUi.getObserverUploadToRemote()
      .pipe(takeUntil(this.destroySubject$)).subscribe((data) => this.onUploadToRemote(data));

    // Watcher sent by DatastoreExplorerBodyLocal
    this.FileSystemUi.getObserverUploadToAnyOpsOS()
      .pipe(takeUntil(this.destroySubject$)).subscribe((data) => this.onUploadToAnyOpsOS(data));

    this.DatastoreExplorerServer.getObserverFileProgress()
      .pipe(takeUntil(this.destroySubject$)).subscribe((data) => this.onFileProgress(data));
  }

  ngOnDestroy(): void {

    // Remove all listeners
    this.destroySubject$.next();
  }

  private onDownloadRemoteFile(data): void {
    if (data.applicationId === 'datastore-explorer#server') {
      this.filesExchange.push({
        uuid: data.connectionUuid,
        name: data.fileName,
        source: data.path + data.fileName,
        path: this.currentLocalPath + data.fileName,
        size: 0, // data.file.size,
        progress: 0,
        exchange: 'download'
      });

      this.DatastoreExplorerServer.downloadFileToanyOpsOS(
        data.path + data.fileName,
        this.currentLocalPath + data.fileName,
        data.connectionUuid
      );
    }
  }

  private onUploadToRemote(data): void {
    if (data.applicationId === 'datastore-explorer') {
      this.filesExchange.push({
        uuid: this.activeConnection,
        name: data.fileName,
        source: data.path + data.fileName,
        path: this.currentRemotePath + data.fileName,
        size: 0, // data.file.attrs.size,
        progress: 0,
        exchange: 'upload'
      });

      this.DatastoreExplorerLocal.uploadFileToRemote(
        data.path + data.fileName,
        this.currentRemotePath + data.fileName,
        this.activeConnection
      );
    }
  }

  private onUploadToAnyOpsOS(data): void {
    console.log(data.file);
    let percentage = 0;

    if (data.applicationId === 'datastore-explorer') {
      this.filesExchange.push({
        uuid: this.activeConnection,
        name: data.file.name,
        source: 'local',
        path: data.dst + data.file.name,
        size: data.file.size,
        progress: 0,
        exchange: 'local'
      });

      this.DatastoreExplorerLocal.uploadFileToAnyOpsOS(
        data.dst,
        data.file
      ).subscribe(
        (event: {loaded: number, total: number}) => {
          const result: number = parseInt(((event.loaded * 100) / event.total).toFixed(), 10);

          if (result !== percentage) {
            percentage = result;

            // set percentage
            this.filesExchange.filter((e) => {
              return e.exchange === 'local' && e.path === data.dst + data.file.name && e.uuid === this.activeConnection;
            })[0].progress = result;
          }

          if (result === 100) this.DatastoreExplorerLocal.reloadPath();

        },
        error => console.log('Error Uploading', error)
      );
    }
  }

  private onFileProgress(data): void {
    // Get path without fileName
    if (data.progress === 100 && data.exchange === 'download') {
      this.DatastoreExplorerLocal.reloadPath(data.destination.substring(0, data.destination.lastIndexOf('/') + 1));
    }
    if (data.progress === 100 && data.exchange === 'upload') {
      this.DatastoreExplorerServer.reloadPath(this.activeConnection, data.destination.substring(0, data.destination.lastIndexOf('/') + 1));
    }

    this.filesExchange.filter((e) => {
      return e.exchange === data.exchange && e.path === data.destination && e.uuid === data.uuid;
    })[0].progress = data.progress;
  }
}
