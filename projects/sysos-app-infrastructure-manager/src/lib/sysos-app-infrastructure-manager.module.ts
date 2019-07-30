import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatDividerModule,
  MatMenuModule,
  MatButtonModule,
  MatSlideToggleModule,
  MatTreeModule,
  MatIconModule,
  MatCardModule,
  MatProgressBarModule
} from '@angular/material';

import {ToastrModule} from 'ngx-toastr';

import {SysosLibApplicationService} from '@sysos/lib-application';
import {SysosLibServiceInjectorService} from '@sysos/lib-service-injector';

import {ActionsComponent} from './actions/actions.component';
import {BodyComponent} from './body/body.component';
import {BodyNewConnectionComponent} from './body/body-new-connection/body-new-connection.component';
import {MenuComponent} from './menu/menu.component';
import {StatusComponent} from './status/status.component';

import {SysosAppInfrastructureManagerService} from './services/sysos-app-infrastructure-manager.service';
import {SysosAppInfrastructureVmwareService} from './services/sysos-app-infrastructure-vmware.service';
import {BodyVmwareComponent} from './body/body-vmware/body-vmware.component';
import {BodyVmwareDatacenterComponent} from './body/body-vmware-datacenter/body-vmware-datacenter.component';
import {BodyVmwareClusterComponent} from './body/body-vmware-cluster/body-vmware-cluster.component';
import {BodyVmwareHostComponent} from './body/body-vmware-host/body-vmware-host.component';
import {BodyVmwareFolderComponent} from './body/body-vmware-folder/body-vmware-folder.component';
import {BodyVmwareResourcePoolComponent} from './body/body-vmware-resource-pool/body-vmware-resource-pool.component';
import {BodyVmwareVirtualMachineComponent} from './body/body-vmware-virtual-machine/body-vmware-virtual-machine.component';
import {BodyVmwareDatastoreComponent} from './body/body-vmware-datastore/body-vmware-datastore.component';
import {BodyVmwareStoragePodComponent} from './body/body-vmware-storage-pod/body-vmware-storage-pod.component';
import {BodyVmwareVirtualAppComponent} from './body/body-vmware-virtual-app/body-vmware-virtual-app.component';
import {BodyNetappComponent} from './body/body-netapp/body-netapp.component';
import {BodyNetappVserverComponent} from './body/body-netapp-vserver/body-netapp-vserver.component';
import {BodyNetappVolumeComponent} from './body/body-netapp-volume/body-netapp-volume.component';
import {BodyNetappSnapshotComponent} from './body/body-netapp-snapshot/body-netapp-snapshot.component';
import { VmwareRecentTasksComponent } from './body/vmware-recent-tasks/vmware-recent-tasks.component';

@NgModule({
  declarations: [
    ActionsComponent,
    BodyComponent,
    BodyNewConnectionComponent,
    MenuComponent,
    StatusComponent,
    BodyVmwareComponent,
    BodyVmwareDatacenterComponent,
    BodyVmwareClusterComponent,
    BodyVmwareHostComponent,
    BodyVmwareFolderComponent,
    BodyVmwareResourcePoolComponent,
    BodyVmwareVirtualMachineComponent,
    BodyVmwareDatastoreComponent,
    BodyVmwareStoragePodComponent,
    BodyVmwareVirtualAppComponent,
    BodyNetappComponent,
    BodyNetappVserverComponent,
    BodyNetappVolumeComponent,
    BodyNetappSnapshotComponent,
    VmwareRecentTasksComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatDividerModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatTreeModule,
    MatIconModule,
    MatCardModule,
    MatProgressBarModule,
    ToastrModule.forRoot()
  ],
  exports: []
})
export class SysosAppInfrastructureManagerModule {
  constructor(private serviceInjector: SysosLibServiceInjectorService,
              private Applications: SysosLibApplicationService,
              private InfrastructureManager: SysosAppInfrastructureManagerService,
              private InfrastructureVmwareService: SysosAppInfrastructureVmwareService) {

    this.serviceInjector.set('SysosAppInfrastructureManagerService', this.InfrastructureManager);
    this.serviceInjector.set('SysosAppInfrastructureVmwareService', this.InfrastructureVmwareService);

    Applications.registerApplication({
      id: 'infrastructure-manager',
      ico: 'server',
      name: 'Infrastructure Manager',
      menu: true,
      actions: true,
      status: true,
      style: {width: '1700px', height: '750px', top: '8%', left: '7%'}
    });

    this.InfrastructureManager.initConnections();
    this.InfrastructureManager.initLinksMap();
    this.InfrastructureVmwareService.registerFileSystemUiHandlers();
  }
}
