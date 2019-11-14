import {Component, Input, OnInit} from '@angular/core';

import {Application} from '@anyopsos/lib-application';

import {AnyOpsOSAppSftpService} from '../services/anyopsos-app-sftp.service';
import {SftpConnection} from '../types/sftp-connection';

@Component({
  selector: 'sasftp-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {
  @Input() application: Application;

  constructor(private Sftp: AnyOpsOSAppSftpService) {
  }

  ngOnInit() {
  }

  getActiveConnection(): SftpConnection {
    return this.Sftp.getActiveConnection();
  }
}
