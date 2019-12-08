import {Component, Input} from '@angular/core';

import {Application} from '@anyopsos/lib-application';

import {AnyOpsOSAppSftpService} from '../../services/anyopsos-app-sftp.service';
import {SftpConnection} from '../../types/sftp-connection';

@Component({
  selector: 'sasftp-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent {
  @Input() application: Application;

  constructor(private Sftp: AnyOpsOSAppSftpService) {
  }

  getActiveConnection(): SftpConnection {
    return this.Sftp.getActiveConnection();
  }
}
