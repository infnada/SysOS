import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ToastrModule} from 'ngx-toastr';

import {AnyOpsOSLibAngularMaterialModule} from '@anyopsos/lib-angular-material';
import {AnyOpsOSLibApplicationService} from '@anyopsos/lib-application';
import {AnyOpsOSLibServiceInjectorService} from '@anyopsos/lib-service-injector';
import {AnyOpsOSLibExtWeavescopeModule} from '@anyopsos/lib-ext-weavescope';

import {ActionsComponent} from './actions/actions.component';
import {BodyComponent} from './body/body.component';
import {BodyNewConnectionComponent} from './body/body-new-connection/body-new-connection.component';
import {MenuComponent} from './menu/menu.component';
import {StatusComponent} from './status/status.component';

import {AnyOpsOSAppInfrastructureManagerService} from './services/anyopsos-app-infrastructure-manager.service';
import {AnyOpsOSAppInfrastructureVmwareService} from './services/vmware/anyopsos-app-infrastructure-vmware.service';
import {AnyOpsOSAppInfrastructureNetappService} from './services/netapp/anyopsos-app-infrastructure-netapp.service';
import {AnyOpsOSAppInfrastructureManagerObjectHelperService} from './services/anyopsos-app-infrastructure-manager-object-helper.service';
import {AnyOpsOSAppInfrastructureManagerNodeGraphService} from './services/anyopsos-app-infrastructure-manager-node-graph.service';
import {AnyOpsOSAppInfrastructureManagerNodeLinkService} from './services/anyopsos-app-infrastructure-manager-node-link.service';

import {BodyVmwareComponent} from './body/body-vmware/body-vmware.component';
import {BodyNetappComponent} from './body/body-netapp/body-netapp.component';
import {BodyNetappVserverComponent} from './body/body-netapp-vserver/body-netapp-vserver.component';
import {BodyNetappVolumeComponent} from './body/body-netapp-volume/body-netapp-volume.component';
import {BodyNetappSnapshotComponent} from './body/body-netapp-snapshot/body-netapp-snapshot.component';
import {VmwareRecentTasksComponent} from './body/vmware-recent-tasks/vmware-recent-tasks.component';
import {TagsComponent} from './body/body-vmware/tabs/tab-summary/tags/tags.component';
import {RelatedObjectsComponent} from './body/body-vmware/tabs/tab-summary/related-objects/related-objects.component';
import {CustomAttributesComponent} from './body/body-vmware/tabs/tab-summary/custom-attributes/custom-attributes.component';
import {VmStoragePoliciesComponent} from './body/body-vmware/tabs/tab-summary/vm-storage-policies/vm-storage-policies.component';
import {SummaryInfoComponent} from './body/body-vmware/tabs/tab-summary/summary-info/summary-info.component';
import {HomeComponent} from './body/body-vmware/home/home.component';
import {ObjectComponent} from './body/body-vmware/object/object.component';
import {TabSummaryComponent} from './body/body-vmware/tabs/tab-summary/tab-summary.component';
import {TabMonitorComponent} from './body/body-vmware/tabs/tab-monitor/tab-monitor.component';
import {TabAlarmsComponent} from './body/body-vmware/tabs/tab-alarms/tab-alarms.component';
import {TabUpdatesComponent} from './body/body-vmware/tabs/tab-updates/tab-updates.component';
import {TabConfigureComponent} from './body/body-vmware/tabs/tab-configure/tab-configure.component';

import {DatastoreClusterResourcesComponent} from './body/body-vmware/tabs/tab-summary/datastore-cluster-resources/datastore-cluster-resources.component';
import {VappStatusComponent} from './body/body-vmware/tabs/tab-summary/vapp-status/vapp-status.component';
import {ResourcePoolSettingsComponent} from './body/body-vmware/tabs/tab-summary/resource-pool-settings/resource-pool-settings.component';
import {HostHardwareComponent} from './body/body-vmware/tabs/tab-summary/host-hardware/host-hardware.component';
import {HostConfigurationComponent} from './body/body-vmware/tabs/tab-summary/host-configuration/host-configuration.component';
import {VsphereDrsComponent} from './body/body-vmware/tabs/tab-summary/vsphere-drs/vsphere-drs.component';
import {ClusterResourcesComponent} from './body/body-vmware/tabs/tab-summary/cluster-resources/cluster-resources.component';
import {ClusterConsumersComponent} from './body/body-vmware/tabs/tab-summary/cluster-consumers/cluster-consumers.component';
import {VcenterHaComponent} from './body/body-vmware/tabs/tab-summary/vcenter-ha/vcenter-ha.component';
import {VersionInformationComponent} from './body/body-vmware/tabs/tab-summary/version-information/version-information.component';
import {StorageDrsComponent} from './body/body-vmware/tabs/tab-summary/storage-drs/storage-drs.component';
import {SwitchFeaturesComponent} from './body/body-vmware/tabs/tab-summary/switch-features/switch-features.component';

@NgModule({
  declarations: [
    ActionsComponent,
    BodyComponent,
    BodyNewConnectionComponent,
    MenuComponent,
    StatusComponent,
    BodyVmwareComponent,
    BodyNetappComponent,
    BodyNetappVserverComponent,
    BodyNetappVolumeComponent,
    BodyNetappSnapshotComponent,
    VmwareRecentTasksComponent,
    TagsComponent,
    RelatedObjectsComponent,
    CustomAttributesComponent,
    VmStoragePoliciesComponent,
    SummaryInfoComponent,
    TabSummaryComponent,
    HomeComponent,
    ObjectComponent,
    DatastoreClusterResourcesComponent,
    VappStatusComponent,
    ResourcePoolSettingsComponent,
    HostHardwareComponent,
    HostConfigurationComponent,
    VsphereDrsComponent,
    ClusterResourcesComponent,
    ClusterConsumersComponent,
    VcenterHaComponent,
    VersionInformationComponent,
    StorageDrsComponent,
    SwitchFeaturesComponent,
    TabMonitorComponent,
    TabAlarmsComponent,
    TabUpdatesComponent,
    TabConfigureComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    // Shared module import
    AnyOpsOSLibExtWeavescopeModule,
    AnyOpsOSLibAngularMaterialModule
  ],
  exports: []
})
export class AnyOpsOSAppInfrastructureManagerModule {
  constructor(private serviceInjector: AnyOpsOSLibServiceInjectorService,
              private Applications: AnyOpsOSLibApplicationService,
              private InfrastructureManager: AnyOpsOSAppInfrastructureManagerService,
              private InfrastructureManagerObjectHelpers: AnyOpsOSAppInfrastructureManagerObjectHelperService,
              private InfrastructureManagerNodeLink: AnyOpsOSAppInfrastructureManagerNodeLinkService,
              private InfrastructureManagerNodeGraph: AnyOpsOSAppInfrastructureManagerNodeGraphService,
              private InfrastructureVmware: AnyOpsOSAppInfrastructureVmwareService,
              private InfrastructureNetApp: AnyOpsOSAppInfrastructureNetappService) {

    this.serviceInjector.set('AnyOpsOSAppInfrastructureManagerService', this.InfrastructureManager);
    this.serviceInjector.set('AnyOpsOSAppInfrastructureManagerNodeLinkService', this.InfrastructureManagerNodeLink);
    this.serviceInjector.set('AnyOpsOSAppInfrastructureManagerNodeGraphService', this.InfrastructureManagerNodeGraph);
    this.serviceInjector.set('AnyOpsOSAppInfrastructureVmwareService', this.InfrastructureVmware);
    this.serviceInjector.set('AnyOpsOSAppInfrastructureManagerObjectHelperService', this.InfrastructureManagerObjectHelpers);

    Applications.registerApplication({
      id: 'infrastructure-manager',
      ico: 'fas fa-server',
      name: 'Infrastructure Manager',
      menu: true,
      actions: true,
      status: true,
      style: {width: '1700px', height: '750px', top: '8%', left: '7%'}
    });

    this.InfrastructureManager.initConnections();
    this.InfrastructureManager.initLinksMap();
    this.InfrastructureVmware.registerFileSystemUiHandlers();
    this.InfrastructureNetApp.registerFileSystemUiHandlers();
  }
}
