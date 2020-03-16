import {Component, Input, OnInit} from '@angular/core';

import {takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';

import {Application} from '@anyopsos/lib-application';

import {AnyOpsOSAppDatastoreExplorerService} from '../../services/anyopsos-app-datastore-explorer.service';
import {DatastoreExplorerConnectionObject} from '../../types/datastore-explorer-connection-object';

@Component({
  selector: 'aade-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {
  @Input() private readonly application: Application;

  private readonly destroySubject$: Subject<void> = new Subject();

  activeConnectionObjectUuid: string;

  constructor(private readonly DatastoreExplorer: AnyOpsOSAppDatastoreExplorerService) {
  }

  ngOnInit(): void {

    // Listen for activeConnectionUuid change
    this.DatastoreExplorer.activeConnectionObjectUuid
      .pipe(takeUntil(this.destroySubject$)).subscribe((activeConnectionObjectUuid: string) => this.activeConnectionObjectUuid = activeConnectionObjectUuid);
  }

  ngOnDestroy(): void {

    // Remove all listeners
    this.destroySubject$.next();
  }

  getActiveConnectionObjectObs(): Observable<DatastoreExplorerConnectionObject | null> {
    return this.DatastoreExplorer.activeConnectionObject;
  }
}
