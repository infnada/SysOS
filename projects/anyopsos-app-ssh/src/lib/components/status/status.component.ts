import {Component, Input} from '@angular/core';

import {Application} from '@anyopsos/lib-application';

import {SshConnection} from '../../types/ssh-connection';
import {AnyOpsOSAppSshService} from '../../services/anyopsos-app-ssh.service';

@Component({
  selector: 'sassh-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent {
  @Input() application: Application;

  constructor(private Ssh: AnyOpsOSAppSshService) {
  }

  getActiveConnection(): SshConnection {
    return this.Ssh.getActiveConnection();
  }

}
