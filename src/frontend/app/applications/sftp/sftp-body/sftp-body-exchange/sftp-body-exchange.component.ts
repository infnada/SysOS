import {Component, Input, OnInit} from '@angular/core';

import {Subscription} from 'rxjs';

import {Application} from '../../../../interfaces/application';
import {FileSystemUiService} from '../../../../services/file-system-ui.service';
import {SftpServerService} from '../../services/sftp-server.service';
import {SftpLocalService} from '../../services/sftp-local.service';
@Component({
  selector: 'app-sftp-body-exchange',
  templateUrl: './sftp-body-exchange.component.html',
  styleUrls: ['./sftp-body-exchange.component.scss']
})
export class SftpBodyExchangeComponent implements OnInit {
  @Input() application: Application;

  private downloadRemoteFileSubscription: Subscription;
  private currentLocalPath: string;

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
              private SftpServer: SftpServerService,
              private SftpLocal: SftpLocalService) {

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
          this.currentLocalPath + data.file.filename,
          data.path + data.file.filename,
          data.connectionUuid
        );
      }
    });

  }

  ngOnInit() {
    this.SftpLocal.currentPath.subscribe(path => this.currentLocalPath = path);
  }

  /*
  // TODO
  $scope.$on('sftp__progress_data', function (event, data) {
    _this.uploadFiles.filter(function (e) {
      return e.exchange === data.exchange && e.path === data.destination && e.uuid === data.uuid;
    })[0].progress = data.progress;
  });*/

}
