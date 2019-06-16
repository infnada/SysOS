import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {ModalService} from '../../../../services/modal.service';
import {DatastoreExplorerService} from '../../services/datastore-explorer.service';
import {InfrastructureManagerVmwareService} from '../../../infrastructure-manager/services/infrastructure-manager-vmware.service';
import {InfrastructureManagerService} from '../../../infrastructure-manager/services/infrastructure-manager.service';
import {DatastoreExplorerServerService} from '../../services/datastore-explorer-server.service';

import {Application} from '../../../../interfaces/application';
import {DatastoreExplorerConnection} from '../../DatastoreExplorerConnection';
import {IMConnection} from '../../../infrastructure-manager/interfaces/IMConnection';

@Component({
  selector: 'app-datastore-explorer-body-new-connection',
  templateUrl: './datastore-explorer-body-new-connection.component.html',
  styleUrls: ['./datastore-explorer-body-new-connection.component.scss']
})
export class DatastoreExplorerBodyNewConnectionComponent implements OnInit {
  @Input() application: Application;

  datastores: DatastoreExplorerConnection[] = [];
  connectionForm: FormGroup;
  submitted: boolean = false;
  newConnectionType: string = null;

  constructor(private formBuilder: FormBuilder,
              private Modal: ModalService,
              private DatastoreExplorer: DatastoreExplorerService,
              private InfrastructureManager: InfrastructureManagerService,
              private DatastoreExplorerServer: DatastoreExplorerServerService,
              private InfrastructureManagerVMWare: InfrastructureManagerVmwareService) {

  }

  ngOnInit() {
    this.connectionForm = this.formBuilder.group({
      datastore: ['', Validators.required],
    });

    this.DatastoreExplorer.activeConnection.subscribe((activeConnection: string) => {

      if (!activeConnection) return;

      (this.connectionForm.controls.datastore as FormControl).setValue(this.getActiveConnection());
    });
  }

  get f() { return this.connectionForm.controls; }

  setConnectionType(type: string): void {
    this.newConnectionType = type;

    // TODO get datacenter
    if (type === 'vmware') {
      this.InfrastructureManager.getConnectionsByType('vmware').forEach((connection: IMConnection) => {
        this.InfrastructureManagerVMWare.getConnectionDatastores(connection.uuid).forEach(datastore => {

          this.datastores.push({
            name: datastore.name,
            datastoreId: datastore.obj[0]._,
            credential: connection.credential,
            host: connection.host,
            port: connection.port,
            datacenter: datastore.datacenter
          });
        });
      });
    }
    if (type === 'netapp') this.Modal.openLittleModal('NetApp Volume Explorer', 'Not available in this release', '.window--datastore-explorer .window__main', 'plain');
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
