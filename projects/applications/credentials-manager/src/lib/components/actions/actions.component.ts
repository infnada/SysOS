import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

import {Application} from '@anyopsos/lib-application';

import {AnyOpsOSAppCredentialsManagerService} from '../../services/anyopsos-app-credentials-manager.service';

@Component({
  selector: 'aacm-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnDestroy, OnInit {
  @Input() private readonly application: Application;

  private readonly destroySubject$: Subject<void> = new Subject();

  activeCredentialUuid: string;

  constructor(private readonly CredentialsManager: AnyOpsOSAppCredentialsManagerService) {
  }

  ngOnInit(): void {

    // Listen for activeCredentialUuid change
    this.CredentialsManager.activeCredentialUuid
      .pipe(takeUntil(this.destroySubject$)).subscribe((activeCredentialUuid: string | null) => this.activeCredentialUuid = activeCredentialUuid);
  }

  ngOnDestroy(): void {

    // Remove all listeners
    this.destroySubject$.next();
  }

  newCredential(): void {

    // even if activeCredential === null, set it again to reset possible Form changes
    this.CredentialsManager.setActiveCredentialUuid(null);
  }

  deleteCredential(): void {
    if (this.activeCredentialUuid === null) return;

    this.CredentialsManager.deleteCredential();
  }

}
