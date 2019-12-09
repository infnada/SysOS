import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

import {AnyOpsOSLibServiceInjectorService} from '@anyopsos/lib-service-injector';
import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';
import {AnyOpsOSLibApplicationService, Application} from '@anyopsos/lib-application';
import {ImConnection, ConnectionVmware, ConnectionNetapp, ImDataObject, NetAppVolume, VMWareDatastore} from '@anyopsos/app-infrastructure-manager';

import {DatastoreExplorerConnection} from '../../types/datastore-explorer-connection';
import {AnyOpsOSAppDatastoreExplorerService} from '../../services/anyopsos-app-datastore-explorer.service';
import {AnyOpsOSAppDatastoreExplorerServerService} from '../../services/anyopsos-app-datastore-explorer-server.service';

@Component({
  selector: 'sade-body-new-connection',
  templateUrl: './body-new-connection.component.html',
  styleUrls: ['./body-new-connection.component.scss']
})
export class BodyNewConnectionComponent implements OnDestroy, OnInit {
  @Input() application: Application;

  private destroySubject$: Subject<void> = new Subject();
  private InfrastructureManager;
  private InfrastructureManagerObjectHelper;

  datastores: ImDataObject[] = [];
  connectionForm: FormGroup;
  newConnectionType: string = null;

  constructor(private formBuilder: FormBuilder,
              private Applications: AnyOpsOSLibApplicationService,
              private Modal: AnyOpsOSLibModalService,
              private serviceInjector: AnyOpsOSLibServiceInjectorService,
              private DatastoreExplorer: AnyOpsOSAppDatastoreExplorerService,
              private DatastoreExplorerServer: AnyOpsOSAppDatastoreExplorerServerService) {

    this.InfrastructureManager = this.serviceInjector.get('AnyOpsOSAppInfrastructureManagerService');
    this.InfrastructureManagerObjectHelper = this.serviceInjector.get('AnyOpsOSAppInfrastructureManagerObjectHelperService');
  }

  ngOnInit(): void {
    this.connectionForm = this.formBuilder.group({
      datastore: ['', Validators.required],
    });

    this.DatastoreExplorer.activeConnection.pipe(takeUntil(this.destroySubject$)).subscribe((activeConnection: string) => {

      if (!activeConnection) this.newConnectionType = null;
      if (this.datastores.length === 0) return this.connectionForm.controls.datastore.disable();

      if (!activeConnection) return this.connectionForm.reset();

      this.newConnectionType = this.getActiveConnection().type;
      this.connectionForm.controls.datastore.enable();
      this.connectionForm.controls.datastore.setValue(this.getActiveConnection());
    });

    /**
     * If initData TODO
     */
    if (this.application.initData && this.application.initData.type) {
      const initConnection = this.InfrastructureManager.getConnectionByUuid(this.application.initData.connectionUuid);

      if (this.application.initData.type === 'vmware') {
        this.DatastoreExplorer.connect({
          credential: initConnection.credential,
          host: initConnection.host,
          port: initConnection.port,
          data: {
            obj: this.application.initData.data.datastore,
            datacenter: this.InfrastructureManagerObjectHelper.getParentObjectByType(this.application.initData.connectionUuid, 'Datacenter', this.application.initData.data.datastore.info.parent)
          },
          type: 'vmware'
        }).then(() => {
          this.DatastoreExplorerServer.reloadPath(this.getActiveConnection().uuid);
        });
      }

      if (this.application.initData.type === 'netapp') {
        this.DatastoreExplorer.connect({
          credential: initConnection.credential,
          host: initConnection.host,
          port: initConnection.port,
          data: {
            obj: this.application.initData.data.volume
          },
          type: 'netapp'
        }).then(() => {
          this.DatastoreExplorerServer.reloadPath(this.getActiveConnection().uuid);
        });
      }
    }
  }

  ngOnDestroy(): void {
    this.connectionForm.reset();
    this.destroySubject$.next();
  }

  get f(): { [key: string]: AbstractControl } { return this.connectionForm.controls; }

  setConnectionType(type: string): void {
    this.newConnectionType = type;

    if (type === 'vmware') {
      this.datastores = this.InfrastructureManagerObjectHelper.getObjectsByType(null, 'Datastore') as (ImDataObject & { info: { data: VMWareDatastore } })[];
    }

    if (type === 'netapp') {
      this.datastores = this.InfrastructureManagerObjectHelper.getObjectsByType(null, 'volume') as (ImDataObject & { info: { data: NetAppVolume } })[];
    }

  }

  getDatastoreConnection(datastore: ImDataObject): ImConnection & (ConnectionNetapp | ConnectionVmware) {
    return this.InfrastructureManager.getConnectionByUuid(datastore.info.mainUuid);
  }

  sendConnect(): void {
    // stop here if form is invalid
    if (this.connectionForm.invalid) return;

    const selectedDatastore: ImDataObject = this.connectionForm.value.datastore;
    const connection: ImConnection & (ConnectionNetapp | ConnectionVmware) = this.getDatastoreConnection(selectedDatastore);

    const datastoreConnection: DatastoreExplorerConnection = {
      credential: connection.credential,
      host: connection.host,
      port: connection.port,
      data: {
        obj: selectedDatastore,
        datacenter: (this.newConnectionType === 'vmware' ?
          this.InfrastructureManagerObjectHelper.getParentObjectByType(selectedDatastore.info.mainUuid, 'Datacenter', selectedDatastore.info.parent)
        : null)
      },
      type: this.newConnectionType
    };

    this.Modal.openLittleModal('PLEASE WAIT', 'Connecting to server...', '.window--datastore-explorer .window__main', 'plain').then(() => {
      return this.DatastoreExplorer.connect(datastoreConnection);
    }).then(() => {
      return this.DatastoreExplorerServer.reloadPath(this.getActiveConnection().uuid);
    });
  }

  getActiveConnection(): DatastoreExplorerConnection {
    return this.DatastoreExplorer.getActiveConnection();
  }

  manageIMConnections(): void {
    this.Applications.openApplication('infrastructure-manager');
  }
}
