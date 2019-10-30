import {Component, Input, OnDestroy} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

import {Application} from '@sysos/lib-application';

import {SysosAppCredentialsManagerService} from '../services/sysos-app-credentials-manager.service';

@Component({
  selector: 'sacm-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnDestroy {
  @Input() application: Application;

  private destroySubject$: Subject<void> = new Subject();

  activeCredential: string;

  constructor(private CredentialsManager: SysosAppCredentialsManagerService) {
    this.CredentialsManager.activeCredential.pipe(takeUntil(this.destroySubject$)).subscribe(credential => this.activeCredential = credential);
  }

  ngOnDestroy() {
    this.destroySubject$.next();
  }

  newCredential(): void {
    if (this.activeCredential === null) return;

    this.CredentialsManager.setActiveCredential(null);
  }

  deleteCredential(): void {
    if (this.activeCredential === null) return;

    this.CredentialsManager.deleteCredential();
  }

}
