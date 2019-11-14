import {Component, Input, OnDestroy, OnInit} from '@angular/core';

import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {Application} from '@anyopsos/lib-application';
import {AnyOpsOSLibFileSystemUiService} from '@anyopsos/lib-file-system-ui';

import {AnyOpsOSAppDatastoreExplorerService} from '../../services/anyopsos-app-datastore-explorer.service';
import {AnyOpsOSAppDatastoreExplorerServerService} from '../../services/anyopsos-app-datastore-explorer-server.service';
import {AnyOpsOSAppDatastoreExplorerLocalService} from '../../services/anyopsos-app-datastore-explorer-local.service';

@Component({
  selector: 'sade-body-exchange',
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
    size: string,
    progress: number,
    exchange: string
  }[] = [];

  constructor(private FileSystemUi: AnyOpsOSLibFileSystemUiService,
              private DatastoreExplorer: AnyOpsOSAppDatastoreExplorerService,
              private DatastoreExplorerServer: AnyOpsOSAppDatastoreExplorerServerService,
              private DatastoreExplorerLocal: AnyOpsOSAppDatastoreExplorerLocalService) {

    // Watcher sent by FileComponent
    this.FileSystemUi.getObserverDownloadRemoteFile().pipe(takeUntil(this.destroySubject$)).subscribe((data) => {
      if (data.applicationId === 'datastore-explorer#server') {
        this.filesExchange.push({
          uuid: data.connectionUuid,
          name: data.file.filename,
          source: data.path + data.file.filename,
          path: this.currentLocalPath + data.file.filename,
          size: data.file.attrs.size,
          progress: 0,
          exchange: 'download'
        });

        this.DatastoreExplorerServer.downloadFileToanyOpsOS(
          data.path + data.file.filename,
          this.currentLocalPath + data.file.filename,
          data.connectionUuid
        );
      }
    });

    // Watcher sent by FileComponent
    this.FileSystemUi.getObserverUploadToRemote().pipe(takeUntil(this.destroySubject$)).subscribe((data) => {
      if (data.applicationId === 'datastore-explorer') {
        this.filesExchange.push({
          uuid: this.activeConnection,
          name: data.file.filename,
          source: data.path + data.file.filename,
          path: this.currentRemotePath + data.file.filename,
          size: data.file.attrs.size,
          progress: 0,
          exchange: 'upload'
        });

        this.DatastoreExplorerLocal.uploadFileToRemote(
          data.path + data.file.filename,
          this.currentRemotePath + data.file.filename,
          this.activeConnection
        );
      }
    });

    // Watcher sent by DatastoreExplorerBodyLocal
    this.FileSystemUi.getObserverUploadToanyOpsOS().pipe(takeUntil(this.destroySubject$)).subscribe((data) => {
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

        this.DatastoreExplorerLocal.uploadFileToanyOpsOS(
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
    });

    this.DatastoreExplorerServer.getObserverFileProgress().pipe(takeUntil(this.destroySubject$)).subscribe((data) => {

      // Get path without filename
      if (data.progress === 100 && data.exchange === 'download') {
        this.DatastoreExplorerLocal.reloadPath(data.destination.substring(0, data.destination.lastIndexOf('/') + 1));
      }
      if (data.progress === 100 && data.exchange === 'upload') {
        this.DatastoreExplorerServer.reloadPath(this.activeConnection, data.destination.substring(0, data.destination.lastIndexOf('/') + 1));
      }

      this.filesExchange.filter((e) => {
        return e.exchange === data.exchange && e.path === data.destination && e.uuid === data.uuid;
      })[0].progress = data.progress;
    });

  }

  ngOnInit() {
    this.DatastoreExplorer.viewExchange.pipe(takeUntil(this.destroySubject$)).subscribe(view => this.viewExchange = view);
    this.DatastoreExplorer.activeConnection.pipe(takeUntil(this.destroySubject$)).subscribe(connectionUuid => this.activeConnection = connectionUuid);
    this.DatastoreExplorerLocal.currentPath.pipe(takeUntil(this.destroySubject$)).subscribe(path => this.currentLocalPath = path);
    this.DatastoreExplorerServer.currentPath.pipe(takeUntil(this.destroySubject$)).subscribe(path => this.currentRemotePath = path);
  }

  ngOnDestroy() {
    this.destroySubject$.next();
  }
}
