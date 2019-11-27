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
import {BodyKubernetesComponent} from './body/body-kubernetes/body-kubernetes.component';
import {BodyDockerComponent} from './body/body-docker/body-docker.component';
import {BodyLinuxComponent} from './body/body-linux/body-linux.component';
import {BodySnmpComponent} from './body/body-snmp/body-snmp.component';

import {TabSummaryComponent} from './body/tabs/tab-summary/tab-summary.component';
import {TabMonitorComponent} from './body/tabs/tab-monitor/tab-monitor.component';
import {TabAlarmsComponent} from './body/tabs/tab-alarms/tab-alarms.component';
import {TabUpdatesComponent} from './body/tabs/tab-updates/tab-updates.component';
import {TabConfigureComponent} from './body/tabs/tab-configure/tab-configure.component';

import {VmwareRecentTasksComponent} from './body/vmware-recent-tasks/vmware-recent-tasks.component';

import {TagsComponent} from './body/tabs/tab-summary/tags/tags.component';
import {RelatedObjectsComponent} from './body/tabs/tab-summary/related-objects/related-objects.component';
import {CustomAttributesComponent} from './body/tabs/tab-summary/custom-attributes/custom-attributes.component';
import {VmStoragePoliciesComponent} from './body/tabs/tab-summary/vm-storage-policies/vm-storage-policies.component';
import {SummaryInfoComponent} from './body/tabs/tab-summary/summary-info/summary-info.component';

import {DatastoreClusterResourcesComponent} from './body/tabs/tab-summary/datastore-cluster-resources/datastore-cluster-resources.component';
import {VappStatusComponent} from './body/tabs/tab-summary/vapp-status/vapp-status.component';
import {ResourcePoolSettingsComponent} from './body/tabs/tab-summary/resource-pool-settings/resource-pool-settings.component';
import {HostHardwareComponent} from './body/tabs/tab-summary/host-hardware/host-hardware.component';
import {HostConfigurationComponent} from './body/tabs/tab-summary/host-configuration/host-configuration.component';
import {VsphereDrsComponent} from './body/tabs/tab-summary/vsphere-drs/vsphere-drs.component';
import {ClusterResourcesComponent} from './body/tabs/tab-summary/cluster-resources/cluster-resources.component';
import {ClusterConsumersComponent} from './body/tabs/tab-summary/cluster-consumers/cluster-consumers.component';
import {VcenterHaComponent} from './body/tabs/tab-summary/vcenter-ha/vcenter-ha.component';
import {VersionInformationComponent} from './body/tabs/tab-summary/version-information/version-information.component';
import {StorageDrsComponent} from './body/tabs/tab-summary/storage-drs/storage-drs.component';
import {SwitchFeaturesComponent} from './body/tabs/tab-summary/switch-features/switch-features.component';

import {ChipsDirective} from './directives/chips.directive';

@NgModule({
  declarations: [
    ActionsComponent,
    BodyComponent,
    BodyNewConnectionComponent,
    MenuComponent,
    StatusComponent,

    BodyVmwareComponent,
    BodyNetappComponent,
    BodyKubernetesComponent,
    BodyDockerComponent,
    BodyLinuxComponent,
    BodySnmpComponent,

    TabSummaryComponent,
    TabMonitorComponent,
    TabAlarmsComponent,
    TabUpdatesComponent,
    TabConfigureComponent,

    VmwareRecentTasksComponent,

    TagsComponent,
    RelatedObjectsComponent,
    CustomAttributesComponent,
    VmStoragePoliciesComponent,
    SummaryInfoComponent,

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

    ChipsDirective
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
    this.InfrastructureVmware.registerFileSystemUiHandlers();
    this.InfrastructureNetApp.registerFileSystemUiHandlers();
  }
}
