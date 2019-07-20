import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {SysosLibServiceInjectorService} from '@sysos/lib-service-injector';
import {SysosLibModalService} from '@sysos/lib-modal';
import {Application} from '@sysos/lib-application';
import {IMConnection, NetAppVserver, NetAppVolume} from '@sysos/app-infrastructure-manager';

import {DatastoreExplorerConnection} from '../../types/datastore-explorer-connection';
import {SysosAppDatastoreExplorerService} from '../../services/sysos-app-datastore-explorer.service';
import {SysosAppDatastoreExplorerServerService} from '../../services/sysos-app-datastore-explorer-server.service';
import {VMWareObject} from "../../../../../sysos-app-infrastructure-manager/src/lib/types/vmware-object";
import {VMWareDatastore} from "../../../../../sysos-app-infrastructure-manager/src/lib/types/vmware-datastore";

@Component({
  selector: 'sade-body-new-connection',
  templateUrl: './body-new-connection.component.html',
  styleUrls: ['./body-new-connection.component.scss']
})
export class BodyNewConnectionComponent implements OnInit {
  @Input() application: Application;

  private InfrastructureManager;
  private InfrastructureManagerVMWare;

  datastores: DatastoreExplorerConnection[] = [];
  connectionForm: FormGroup;
  submitted: boolean = false;
  newConnectionType: string = null;

  constructor(private formBuilder: FormBuilder,
              private Modal: SysosLibModalService,
              private serviceInjector: SysosLibServiceInjectorService,
              private DatastoreExplorer: SysosAppDatastoreExplorerService,
              private DatastoreExplorerServer: SysosAppDatastoreExplorerServerService) {

    this.InfrastructureManager = this.serviceInjector.get('SysosAppInfrastructureManagerService');
    this.InfrastructureManagerVMWare = this.serviceInjector.get('SysosAppInfrastructureVmwareService');

  }

  ngOnInit() {
    this.connectionForm = this.formBuilder.group({
      datastore: ['', Validators.required],
    });

    this.DatastoreExplorer.activeConnection.subscribe((activeConnection: string) => {

      if (!activeConnection) return;

      (this.connectionForm.controls.datastore as FormControl).setValue(this.getActiveConnection());
    });

    /**
     * If initData
     */
    if (this.application.initData && this.application.initData.type) {
      if (this.application.initData.type === 'vmware') {
        this.DatastoreExplorer.connect({
          credential: this.application.initData.credential,
          host: this.application.initData.host,
          port: this.application.initData.port,
          data: {
            datastore: this.application.initData.data.datastore,
            datacenter: this.InfrastructureManagerVMWare.getParentObjectByType(this.application.initData.uuid, 'Datacenter', this.application.initData.data.datastore.obj.name)
          },
          type: 'vmware'
        }).then(() => {
          this.DatastoreExplorerServer.reloadPath(this.getActiveConnection().uuid);
        });
      }

      if (this.application.initData.type === 'netapp') {
        this.DatastoreExplorer.connect({
          credential: this.application.initData.credential,
          host: this.application.initData.host,
          port: this.application.initData.port,
          data: {
            volume: this.application.initData.data.volume
          },
          type: 'netapp'
        }).then(() => {
          this.DatastoreExplorerServer.reloadPath(this.getActiveConnection().uuid);
        });
      }
    }
  }

  get f() { return this.connectionForm.controls; }

  setConnectionType(type: string): void {
    this.newConnectionType = type;

    if (type === 'vmware') {
      this.InfrastructureManager.getConnectionsByType('vmware').forEach((connection: IMConnection) => {
        this.InfrastructureManagerVMWare.getObjectByType(connection.uuid, 'Datastore').forEach((datastoreObj: VMWareObject & { data: VMWareDatastore }) => {

          this.datastores.push({
            credential: connection.credential,
            host: connection.host,
            port: connection.port,
            data: {
              datastore: datastoreObj,
              datacenter: this.InfrastructureManagerVMWare.getParentObjectByType(connection.uuid, 'Datacenter', datastoreObj.obj.name)
            },
            type: 'vmware'
          });
        });
      });
    }
    if (type === 'netapp') {
      this.InfrastructureManager.getConnectionsByType('netapp').forEach((connection: IMConnection) => {
        connection.data.Vservers.forEach((vServer: NetAppVserver & { Volumes: NetAppVolume[] }) => {

          if (vServer['vserver-type'] !== 'data') return;

          vServer.Volumes.forEach((volume) => {
            this.datastores.push({
              credential: connection.credential,
              host: connection.host,
              port: connection.port,
              data: {
                volume
              },
              type: 'netapp'
            });
          });

        });
      });
    }
  }

  sendConnect(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.connectionForm.invalid) return;

    this.DatastoreExplorer.connect(this.datastores[this.connectionForm.value.datastore]).then(() => {
      this.DatastoreExplorerServer.reloadPath(this.getActiveConnection().uuid);
    });

    this.submitted = false;
    this.connectionForm.reset();
  }

  getActiveConnection(): DatastoreExplorerConnection {
    return this.DatastoreExplorer.getActiveConnection();
  }
}
