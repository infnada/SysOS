import {Component, Input, OnInit} from '@angular/core';

import {Application} from '@sysos/lib-application';

import {SshConnection} from '../types/ssh-connection';
import {SysosAppSshService} from '../services/sysos-app-ssh.service';

@Component({
  selector: 'sassh-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {
  @Input() application: Application;

  constructor(private Ssh: SysosAppSshService) {
  }

  ngOnInit() {
  }

  getActiveConnection(): SshConnection {
    return this.Ssh.getActiveConnection();
  }

}
