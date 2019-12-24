import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

import {Application} from '@anyopsos/lib-application';

import {AnyOpsOSAppCredentialsManagerService} from '../services/anyopsos-app-credentials-manager.service';

@Component({
  selector: 'sacm-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnDestroy, OnInit {
  @Input() application: Application;

  private destroySubject$: Subject<void> = new Subject();

  activeCredential: string;

  constructor(private readonly CredentialsManager: AnyOpsOSAppCredentialsManagerService) {
  }

  ngOnInit() {

    // Listen for activeCredential change
    this.CredentialsManager.activeCredential
      .pipe(takeUntil(this.destroySubject$)).subscribe((credentialUuid: string) => this.activeCredential = credentialUuid);
  }

  ngOnDestroy(): void {

    // Remove all listeners
    this.destroySubject$.next();
  }

  newCredential(): void {

    // even if activeCredential === null, set it again to reset possible Form changes
    this.CredentialsManager.setActiveCredential(null);
  }

  deleteCredential(): void {
    if (this.activeCredential === null) return;

    this.CredentialsManager.deleteCredential();
  }

}
