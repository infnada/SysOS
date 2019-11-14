import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

import {SysosLibServiceInjectorService} from '@sysos/lib-service-injector';
import {SysosLibModalService} from '@sysos/lib-modal';
import {Application} from '@sysos/lib-application';
import {ImConnection, ImDataObject, NetAppVolume, VMWareDatastore} from '@sysos/app-infrastructure-manager';

import {DatastoreExplorerConnection} from '../../types/datastore-explorer-connection';
import {SysosAppDatastoreExplorerService} from '../../services/sysos-app-datastore-explorer.service';
import {SysosAppDatastoreExplorerServerService} from '../../services/sysos-app-datastore-explorer-server.service';

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
              private Modal: SysosLibModalService,
              private serviceInjector: SysosLibServiceInjectorService,
              private DatastoreExplorer: SysosAppDatastoreExplorerService,
              private DatastoreExplorerServer: SysosAppDatastoreExplorerServerService) {

    this.InfrastructureManager = this.serviceInjector.get('SysosAppInfrastructureManagerService');
    this.InfrastructureManagerObjectHelper = this.serviceInjector.get('SysosAppInfrastructureManagerObjectHelperService');
  }

  ngOnInit() {
    this.connectionForm = this.formBuilder.group({
      datastore: ['', Validators.required],
    });

    this.DatastoreExplorer.activeConnection.pipe(takeUntil(this.destroySubject$)).subscribe((activeConnection: string) => {

      if (!activeConnection) return;

      (this.connectionForm.controls.datastore as FormControl).setValue(this.getActiveConnection());
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
            datacenter: this.InfrastructureManagerObjectHelper.getParentObjectByType(this.application.initData.connectionUuid, 'Datacenter', this.application.initData.data.datastore.info.parent.name)
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

  ngOnDestroy() {
    this.connectionForm.reset();
    this.destroySubject$.next();
  }

  get f() { return this.connectionForm.controls; }

  setConnectionType(type: string): void {
    this.newConnectionType = type;

    if (type === 'vmware') {
      this.datastores.push(
        this.InfrastructureManagerObjectHelper.getObjectsByType(null, 'Datastore') as ImDataObject & { info: { data: VMWareDatastore } }[]
      );
    }

    if (type === 'netapp') {
      this.datastores.push(
        this.InfrastructureManagerObjectHelper.getObjectsByType(null, 'volume') as ImDataObject & { info: { data: NetAppVolume } }[]
      );
    }

  }

  getDatastoreConnection(datastore: ImDataObject): ImConnection {
    return this.InfrastructureManager.getConnectionByUuid(datastore.info.mainUuid);
  }

  sendConnect(): void {
    // stop here if form is invalid
    if (this.connectionForm.invalid) return;

    const selectedDatastore: ImDataObject = this.connectionForm.value.datastore;
    const connection: ImConnection = this.getDatastoreConnection(selectedDatastore);

    const datastoreConnection = {
      credential: connection.credential,
      host: connection.host,
      port: connection.port,
      data: {
        obj: selectedDatastore,
        datacenter: (this.newConnectionType === 'vmware' ?
          this.InfrastructureManagerObjectHelper.getParentObjectByType(selectedDatastore.info.mainUuid, 'Datacenter', selectedDatastore.info.parent.name) as ImDataObject
        : null)
      },
      type: this.newConnectionType
    } as DatastoreExplorerConnection;

    this.Modal.openLittleModal('PLEASE WAIT', 'Connecting to server...', '.window--datastore-explorer .window__main', 'plain').then(() => {
      return this.DatastoreExplorer.connect(datastoreConnection);
    }).then(() => {
      return this.DatastoreExplorerServer.reloadPath(this.getActiveConnection().uuid);
    });
  }

  getActiveConnection(): DatastoreExplorerConnection {
    return this.DatastoreExplorer.getActiveConnection();
  }
}
