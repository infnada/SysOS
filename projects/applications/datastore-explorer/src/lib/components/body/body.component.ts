import {Component, OnInit, Input, OnDestroy, ViewChild, ViewContainerRef} from '@angular/core';

import {combineLatest, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {Application} from '@anyopsos/lib-application';
import {AnyOpsOSLibNodeHelpersService, AnyOpsOSLibNodeTemplateHelpersService} from '@anyopsos/lib-node';
import {AnyOpsOSLibNodeVmwareHelpersService} from '@anyopsos/lib-node-vmware';
import {AnyOpsOSLibNodeNetappHelpersService} from '@anyopsos/lib-node-netapp';
import {ConnectionVmware} from '@anyopsos/module-node-vmware';
import {ConnectionNetapp} from '@anyopsos/module-node-netapp';

import {AnyOpsOSAppDatastoreExplorerService} from '../../services/anyopsos-app-datastore-explorer.service';
import {DatastoreExplorerConnectionObject} from '../../types/datastore-explorer-connection-object';
import {DataObject} from '@anyopsos/backend-core/app/types/data-object';
import {VMWareDatastore} from '@anyopsos/module-node-vmware';
import {NetAppVolume} from '@anyopsos/module-node-netapp';


@Component({
  selector: 'aade-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnDestroy, OnInit {
  @ViewChild('bodyContainer', {static: true, read: ViewContainerRef}) private readonly bodyContainer: ViewContainerRef;
  @Input() readonly application: Application;

  private readonly destroySubject$: Subject<void> = new Subject();

  viewSide: boolean = true;

  connectionObjects: DatastoreExplorerConnectionObject[];
  activeConnectionObjectUuid: string | null;
  viewExchange: boolean;

  constructor(private readonly LibNodeHelpers: AnyOpsOSLibNodeHelpersService,
              private readonly LibNodeVmwareHelpers: AnyOpsOSLibNodeVmwareHelpersService,
              private readonly LibNodeNetappHelpers: AnyOpsOSLibNodeNetappHelpersService,
              private readonly DatastoreExplorer: AnyOpsOSAppDatastoreExplorerService,
              public readonly LibNodeTemplateHelpers: AnyOpsOSLibNodeTemplateHelpersService) {
  }

  ngOnInit(): void {

    // Listen for connections changes
    combineLatest(
      this.LibNodeVmwareHelpers.getAllConnectionsObserver(),
      this.LibNodeNetappHelpers.getAllConnectionsObserver()
    ).pipe(takeUntil(this.destroySubject$)).subscribe(() => this.onConnectionsChange());

    // Set bodyContainerRef, this is used by Modals
    this.DatastoreExplorer.setBodyContainerRef(this.bodyContainer);

    // Listen for activeConnectionUuid change
    this.DatastoreExplorer.activeConnectionObjectUuid
      .pipe(takeUntil(this.destroySubject$)).subscribe((activeConnectionObjectUuid: string | null) => this.activeConnectionObjectUuid = activeConnectionObjectUuid);

    // Listen for viewExchange change
    this.DatastoreExplorer.viewExchange
      .pipe(takeUntil(this.destroySubject$)).subscribe((view: boolean) => this.viewExchange = view);
  }

  ngOnDestroy(): void {

    // Remove all listeners
    this.destroySubject$.next();
  }

  private onConnectionsChange(): void {
    const vmwareObjects: (DataObject & { info: { data: VMWareDatastore } })[] = this.LibNodeHelpers.getObjectsByType(null, 'vmware', 'Datastore');
    const netappObjects: (DataObject & { info: { data: NetAppVolume } })[] = this.LibNodeHelpers.getObjectsByType(null, 'netapp', 'volume');

    this.connectionObjects = [...vmwareObjects, ...netappObjects];

    this.DatastoreExplorer.connectionsUpdated();
  }

  toggleSide(): void {
    this.viewSide = !this.viewSide;
  }

  setActiveConnection(connectionObject: DatastoreExplorerConnectionObject): void {
    this.DatastoreExplorer.setActiveConnectionObjectUuid(connectionObject.info.uuid);
  }

  getMainConnectionHost(connectionObject: DatastoreExplorerConnectionObject): string | null {
    const connection: ConnectionVmware | ConnectionNetapp = this.DatastoreExplorer.getMainConnectionFromObject(connectionObject.info.uuid);
    return connection.host;
  }
}
