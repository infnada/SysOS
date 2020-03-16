import {Injectable, ViewContainerRef} from '@angular/core';

import {BehaviorSubject, Observable} from 'rxjs';
import {take} from 'rxjs/operators';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';
import {AnyOpsOSLibNodeHelpersService} from '@anyopsos/lib-node';
import {ConnectionVmware} from '@anyopsos/module-node-vmware';
import {ConnectionNetapp} from '@anyopsos/module-node-netapp';

import {DatastoreExplorerConnectionObject} from '../types/datastore-explorer-connection-object';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSAppDatastoreExplorerService {
  private readonly $activeConnectionObject: BehaviorSubject<DatastoreExplorerConnectionObject | null>;
  private readonly $activeConnectionObjectUuid: BehaviorSubject<string | null>;
  private readonly $viewExchange: BehaviorSubject<boolean>;
  private dataStore: {
    activeConnectionObject: DatastoreExplorerConnectionObject | null;
    activeConnectionObjectUuid: string | null;
    viewExchange: boolean;
  };
  readonly activeConnectionObject: Observable<DatastoreExplorerConnectionObject | null>;
  readonly activeConnectionObjectUuid: Observable<string | null>;
  readonly viewExchange: Observable<boolean>;

  private bodyContainer: ViewContainerRef;

  constructor(private readonly logger: AnyOpsOSLibLoggerService,
              private readonly LibModal: AnyOpsOSLibModalService,
              private readonly LibNodeHelpers: AnyOpsOSLibNodeHelpersService) {

    this.dataStore = { activeConnectionObject: null, activeConnectionObjectUuid: null, viewExchange: false };
    this.$activeConnectionObject = new BehaviorSubject(this.dataStore.activeConnectionObject);
    this.$activeConnectionObjectUuid = new BehaviorSubject(this.dataStore.activeConnectionObjectUuid);
    this.$viewExchange = new BehaviorSubject(this.dataStore.viewExchange);
    this.activeConnectionObject = this.$activeConnectionObject.asObservable();
    this.activeConnectionObjectUuid = this.$activeConnectionObjectUuid.asObservable();
    this.viewExchange = this.$viewExchange.asObservable();
  }

  /**
   * Show or hide Exchange tab
   */
  toggleExchange(): void {
    this.dataStore.viewExchange = !this.dataStore.viewExchange;

    // broadcast data to subscribers
    this.$viewExchange.next(Object.assign({}, this.dataStore).viewExchange);
  }

  /**
   * Setter & Getter of bodyContainerRef
   * This is used by Modals
   */
  setBodyContainerRef(bodyContainer: ViewContainerRef): void {
    this.bodyContainer = bodyContainer;
  }

  getBodyContainerRef(): ViewContainerRef {
    return this.bodyContainer;
  }

  /**
   * Updates current activeConnectionUuid state
   */
  setActiveConnectionObjectUuid(connectionUuid: string = null): void {
    this.dataStore.activeConnectionObjectUuid = connectionUuid;

    // broadcast data to subscribers
    this.$activeConnectionObjectUuid.next(Object.assign({}, this.dataStore).activeConnectionObjectUuid);

    this.connectionsUpdated();
  }

  getActiveConnection(): Promise<DatastoreExplorerConnectionObject | null> {
    if (this.dataStore.activeConnectionObjectUuid === null) return null;

    // We can use this.dataStore.activeConnection
    return this.activeConnectionObject.pipe(take(1)).toPromise();
  }

  getMainConnectionFromObject(connectionObject: string = null): ConnectionVmware | ConnectionNetapp | null {
    if (!connectionObject) connectionObject = this.dataStore.activeConnectionObjectUuid;
    if (!connectionObject) return null;

    const mainUuid: string = this.LibNodeHelpers.extractMainUuidFromObjectUuid(this.dataStore.activeConnectionObjectUuid);
    const mainType: string = this.LibNodeHelpers.extractMainTypeFromObjectUuid(this.dataStore.activeConnectionObjectUuid);

    return this.LibNodeHelpers.getConnectionByUuid(mainUuid, mainType) as ConnectionVmware | ConnectionNetapp;
  }

  /**
   * Called every time the Vmware & Netapp connections state is updated
   */
  connectionsUpdated(): void {

    if (!this.dataStore.activeConnectionObjectUuid) {
      this.dataStore.activeConnectionObject = null;
    } else {
      const mainUuid: string = this.LibNodeHelpers.extractMainUuidFromObjectUuid(this.dataStore.activeConnectionObjectUuid);
      const mainType: string = this.LibNodeHelpers.extractMainTypeFromObjectUuid(this.dataStore.activeConnectionObjectUuid);

      this.dataStore.activeConnectionObject = this.LibNodeHelpers.getObjectByUuid(mainUuid, mainType, this.dataStore.activeConnectionObjectUuid);
    }

    // broadcast data to subscribers
    this.$activeConnectionObject.next(Object.assign({}, this.dataStore).activeConnectionObject);
  }

}
