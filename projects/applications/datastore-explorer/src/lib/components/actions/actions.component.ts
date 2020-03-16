import {Component, Input, OnDestroy, OnInit} from '@angular/core';

import {takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';

import {Application} from '@anyopsos/lib-application';

import {AnyOpsOSAppDatastoreExplorerService} from '../../services/anyopsos-app-datastore-explorer.service';
import {DatastoreExplorerConnectionObject} from '../../types/datastore-explorer-connection-object';

@Component({
  selector: 'aade-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnDestroy, OnInit {
  @Input() private readonly application: Application;

  private readonly destroySubject$: Subject<void> = new Subject();

  activeConnectionObjectUuid: string | null;

  constructor(private readonly DatastoreExplorer: AnyOpsOSAppDatastoreExplorerService) {
  }

  ngOnInit(): void {

    // Listen for activeConnection change
    this.DatastoreExplorer.activeConnectionObjectUuid
      .pipe(takeUntil(this.destroySubject$)).subscribe((activeConnectionObjectUuid: string | null) => this.activeConnectionObjectUuid = activeConnectionObjectUuid);
  }

  ngOnDestroy(): void {

    // Remove all listeners
    this.destroySubject$.next();
  }

  getActiveConnectionObs(): Observable<DatastoreExplorerConnectionObject | null> {
    return this.DatastoreExplorer.activeConnectionObject;
  }

  toggleExchange(): void {
    this.DatastoreExplorer.toggleExchange();
  }
}
