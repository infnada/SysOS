import {Component, Input, OnInit} from '@angular/core';

import {CredentialsManagerService} from "../credentials-manager.service";
import {Application} from "../../../interfaces/application";

@Component({
  selector: 'app-credentials-manager-actions',
  templateUrl: './credentials-manager-actions.component.html',
  styleUrls: ['./credentials-manager-actions.component.scss']
})
export class CredentialsManagerActionsComponent implements OnInit {
  @Input() application: Application;

  activeCredential: string;

  constructor(private CredentialsManagerService: CredentialsManagerService) {
    this.CredentialsManagerService.activeCredential.subscribe(credential => this.activeCredential = credential);
  }

  ngOnInit() {
  }

  newCredential(): void {
    if (this.activeCredential === null) return;

    this.CredentialsManagerService.setActiveCredential(null);
  }

  deleteCredential(): void {
    if (this.activeCredential === null) return;

    this.CredentialsManagerService.deleteCredential(this.activeCredential);
  }
}
