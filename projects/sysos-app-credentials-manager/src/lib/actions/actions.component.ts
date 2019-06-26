import {Component, Input, OnInit} from '@angular/core';

import {Application} from '@sysos/lib-application';

import {SysosAppCredentialsManagerService} from '../services/sysos-app-credentials-manager.service';

@Component({
  selector: 'sacm-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {
  @Input() application: Application;

  activeCredential: string;

  constructor(private CredentialsManager: SysosAppCredentialsManagerService) {
    this.CredentialsManager.activeCredential.subscribe(credential => this.activeCredential = credential);
  }

  ngOnInit() {
  }

  newCredential(): void {
    if (this.activeCredential === null) return;

    this.CredentialsManager.setActiveCredential(null);
  }

  deleteCredential(): void {
    if (this.activeCredential === null) return;

    this.CredentialsManager.deleteCredential(this.activeCredential);
  }

}
