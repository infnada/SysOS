import {Component, Input, OnInit} from '@angular/core';

import {Subscription} from 'rxjs';

import {Application} from '@sysos/lib-application';
import {SysosLibFileSystemUiService} from '@sysos/lib-file-system-ui';

import {SysosAppSftpService} from '../../services/sysos-app-sftp.service';
import {SysosAppSftpLocalService} from '../../services/sysos-app-sftp-local.service';
import {SysosAppSftpServerService} from '../../services/sysos-app-sftp-server.service';

@Component({
  selector: 'sasftp-body-exchange',
  templateUrl: './body-exchange.component.html',
  styleUrls: ['./body-exchange.component.scss']
})
export class BodyExchangeComponent implements OnInit {
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

  constructor(private FileSystemUi: SysosLibFileSystemUiService,
              private Sftp: SysosAppSftpService,
              private SftpLocal: SysosAppSftpLocalService,
              private SftpServer: SysosAppSftpServerService) {

    // Watcher sent by FileComponent
    this.downloadRemoteFileSubscription = this.FileSystemUi.getObserverDownloadRemoteFile().subscribe((data) => {
      if (data.applicationId === 'sftp') {
        this.filesExchange.push({
          uuid: data.connectionUuid,
          name: data.file.filename,
          source: data.path + data.file.filename,
          path: this.currentLocalPath + data.file.filename,
          size: data.file.attrs.size,
          progress: 0,
          exchange: 'download'
        });

        this.SftpServer.downloadFileToSysOS(
          data.path + data.file.filename,
          this.currentLocalPath + data.file.filename,
          data.connectionUuid
        );
      }
    });

    // Watcher sent by FileComponent
    this.uploadToRemoteSubscription = this.FileSystemUi.getObserverUploadToRemote().subscribe((data) => {
      if (data.applicationId === 'sftp') {
        this.filesExchange.push({
          uuid: this.activeConnection,
          name: data.file.filename,
          source: data.path + data.file.filename,
          path: this.currentRemotePath + data.file.filename,
          size: data.file.attrs.size,
          progress: 0,
          exchange: 'upload'
        });

        this.SftpLocal.uploadFileToRemote(
          data.path + data.file.filename,
          this.currentRemotePath + data.file.filename,
          this.activeConnection
        );
      }
    });

    // Watcher sent by SftpBodyLocal
    this.uploadToSysOSSubscription = this.FileSystemUi.getObserverUploadToSysOS().subscribe((data) => {
      console.log(data.file);
      let percentage = 0;

      if (data.applicationId === 'sftp') {
        this.filesExchange.push({
          uuid: this.activeConnection,
          name: data.file.name,
          source: 'local',
          path: data.dst + data.file.name,
          size: data.file.size,
          progress: 0,
          exchange: 'local'
        });

        this.SftpLocal.uploadFileToSysOS(
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

            if (result === 100) this.SftpLocal.reloadPath();

          },
          error => console.log('Error Uploading', error)
        );
      }
    });

    this.fileProgressSubscription = this.SftpServer.getObserverFileProgress().subscribe((data) => {

      // Get path without filename
      if (data.progress === 100 && data.exchange === 'download') {
        this.SftpLocal.reloadPath(data.destination.substring(0, data.destination.lastIndexOf('/') + 1));
      }
      if (data.progress === 100 && data.exchange === 'upload') {
        this.SftpServer.reloadPath(this.activeConnection, data.destination.substring(0, data.destination.lastIndexOf('/') + 1));
      }

      this.filesExchange.filter((e) => {
        return e.exchange === data.exchange && e.path === data.destination && e.uuid === data.uuid;
      })[0].progress = data.progress;
    });

  }

  ngOnInit() {
    this.Sftp.viewExchange.subscribe(view => this.viewExchange = view);
    this.Sftp.activeConnection.subscribe(connectionUuid => this.activeConnection = connectionUuid);
    this.SftpLocal.currentPath.subscribe(path => this.currentLocalPath = path);
    this.SftpServer.currentPath.subscribe(path => this.currentRemotePath = path);
  }
}
