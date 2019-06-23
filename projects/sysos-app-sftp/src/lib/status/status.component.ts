import {Component, Input, OnInit} from '@angular/core';

import {Application} from '@sysos/libs-application';

import {SysosAppSftpService} from '../services/sysos-app-sftp.service';
import {SftpConnection} from '../types/sftp-connection';

@Component({
  selector: 'sasftp-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {
  @Input() application: Application;

  constructor(private Sftp: SysosAppSftpService) {
  }

  ngOnInit() {
  }

  getActiveConnection(): SftpConnection {
    return this.Sftp.getActiveConnection();
  }
}
