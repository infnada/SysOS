import {Component, Input, OnInit} from '@angular/core';

import {Subscription} from 'rxjs';

import {Application} from '../../../../interfaces/application';
import {FileSystemUiService} from '../../../../services/file-system-ui.service';
import {DatastoreExplorerServerService} from '../../services/datastore-explorer-server.service';
import {DatastoreExplorerLocalService} from '../../services/datastore-explorer-local.service';
import {DatastoreExplorerService} from '../../services/datastore-explorer.service';

@Component({
  selector: 'app-datastore-explorer-body-exchange',
  templateUrl: './datastore-explorer-body-exchange.component.html',
  styleUrls: ['./datastore-explorer-body-exchange.component.scss']
})
export class DatastoreExplorerBodyExchangeComponent implements OnInit {
  @Input() application: Application;

  private downloadRemoteFileSubscription: Subscription;
  private uploadToRemoteSubscription: Subscription;
  private uploadToSysOSSubscription: Subscription;
  private fileProgressSubscription: Subscription;
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

  constructor(private FileSystemUi: FileSystemUiService,
              private DatastoreExplorer: DatastoreExplorerService,
              private DatastoreExplorerServer: DatastoreExplorerServerService,
              private DatastoreExplorerLocal: DatastoreExplorerLocalService) {

    // Watcher sent by FileComponent
    this.downloadRemoteFileSubscription = this.FileSystemUi.getObserverDownloadRemoteFile().subscribe((data) => {
      if (data.applicationId === 'datastore-explorer') {
        this.filesExchange.push({
          uuid: data.connectionUuid,
          name: data.file.filename,
          source: data.path + data.file.filename,
          path: this.currentLocalPath + data.file.filename,
          size: data.file.attrs.size,
          progress: 0,
          exchange: 'download'
        });

        this.DatastoreExplorerServer.downloadFileToSysOS(
          data.path + data.file.filename,
          this.currentLocalPath + data.file.filename,
          data.connectionUuid
        );
      }
    });

    // Watcher sent by FileComponent
    this.uploadToRemoteSubscription = this.FileSystemUi.getObserverUploadToRemote().subscribe((data) => {
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
    this.uploadToSysOSSubscription = this.FileSystemUi.getObserverUploadToSysOS().subscribe((data) => {
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

        this.DatastoreExplorerLocal.uploadFileToSysOS(
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

    this.fileProgressSubscription = this.DatastoreExplorerServer.getObserverFileProgress().subscribe((data) => {

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
    this.DatastoreExplorer.viewExchange.subscribe(view => this.viewExchange = view);
    this.DatastoreExplorer.activeConnection.subscribe(connectionUuid => this.activeConnection = connectionUuid);
    this.DatastoreExplorerLocal.currentPath.subscribe(path => this.currentLocalPath = path);
    this.DatastoreExplorerServer.currentPath.subscribe(path => this.currentRemotePath = path);
  }

}
