import {Component, Input, OnDestroy, OnInit} from '@angular/core';

import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {AnyOpsOSLibApplicationService, Application} from '@anyopsos/lib-application';

import {ConnectionVmware} from '@anyopsos/module-node-vmware';
import {ConnectionNetapp} from '@anyopsos/module-node-netapp';

import {AnyOpsOSAppDatastoreExplorerService} from '../../../services/anyopsos-app-datastore-explorer.service';

@Component({
  selector: 'aade-body-server',
  templateUrl: './body-server.component.html',
  styleUrls: ['./body-server.component.scss']
})
export class BodyServerComponent implements OnDestroy, OnInit {
  @Input() readonly application: Application;

  private readonly destroySubject$: Subject<void> = new Subject();

  activeConnectionObjectUuid: string | null;

  constructor(private readonly LibApplication: AnyOpsOSLibApplicationService,
              private readonly DatastoreExplorer: AnyOpsOSAppDatastoreExplorerService) {
  }

  ngOnInit(): void {

    // Listen for activeConnectionUuid change
    this.DatastoreExplorer.activeConnectionObjectUuid
      .pipe(takeUntil(this.destroySubject$)).subscribe((activeConnectionObjectUuid: string | null) => this.activeConnectionObjectUuid = activeConnectionObjectUuid);
  }

  ngOnDestroy(): void {

    // Remove all listeners
    this.destroySubject$.next();
  }

  getMainActiveConnection(): ConnectionVmware | ConnectionNetapp | null {
    if (!this.activeConnectionObjectUuid) return null;

    return this.DatastoreExplorer.getMainConnectionFromObject();
  }

}
