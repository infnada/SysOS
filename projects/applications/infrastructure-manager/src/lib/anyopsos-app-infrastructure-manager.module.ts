import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AnyOpsOSLibAngularMaterialModule} from '@anyopsos/lib-angular-material';
import {AnyOpsOSLibApplicationService} from '@anyopsos/lib-application';
import {AnyOpsOSLibServiceInjectorService} from '@anyopsos/lib-service-injector';
import {AnyOpsOSLibUtilsModule} from '@anyopsos/lib-utils';
import {AnyOpsOSExtLibWeavescopeModule} from '@anyopsos/ext-lib-weavescope';

import {ActionsComponent} from './components/actions/actions.component';
import {BodyComponent} from './components/body/body.component';
import {BodyNewConnectionComponent} from './components/body/body-new-connection/body-new-connection.component';
import {MenuComponent} from './components/menu/menu.component';
import {StatusComponent} from './components/status/status.component';

// Shared components
import {ChipsComponent} from './components/shared/chips/chips.component';

import {AnyOpsOSAppInfrastructureManagerService} from './services/anyopsos-app-infrastructure-manager.service';
import {AnyOpsOSAppInfrastructureManagerObjectHelperService} from './services/anyopsos-app-infrastructure-manager-object-helper.service';
import {AnyOpsOSAppInfrastructureManagerNodeGraphService} from './services/anyopsos-app-infrastructure-manager-node-graph.service';
import {AnyOpsOSAppInfrastructureManagerNodeLinkService} from './services/anyopsos-app-infrastructure-manager-node-link.service';

import {BodyVmwareComponent} from './components/body/body-vmware/body-vmware.component';
import {BodyNetappComponent} from './components/body/body-netapp/body-netapp.component';
import {BodyKubernetesComponent} from './components/body/body-kubernetes/body-kubernetes.component';
import {BodyDockerComponent} from './components/body/body-docker/body-docker.component';
import {BodyLinuxComponent} from './components/body/body-linux/body-linux.component';
import {BodySnmpComponent} from './components/body/body-snmp/body-snmp.component';

import {TabSummaryComponent} from './components/body/tabs/tab-summary/tab-summary.component';
import {TabMonitorComponent} from './components/body/tabs/tab-monitor/tab-monitor.component';
import {TabAlarmsComponent} from './components/body/tabs/tab-alarms/tab-alarms.component';
import {TabUpdatesComponent} from './components/body/tabs/tab-updates/tab-updates.component';
import {TabConfigureComponent} from './components/body/tabs/tab-configure/tab-configure.component';

// Kubernetes
import {ObjectListComponent} from './components/body/tabs/tab-summary/kubernetes/object-list/object-list.component';
import {KubernetesObjectDetailComponent} from './components/body/tabs/tab-summary/kubernetes/kubernetes-object-detail/kubernetes-object-detail.component';

// VMWare
import {VmwareRecentTasksComponent} from './components/body/vmware-recent-tasks/vmware-recent-tasks.component';

import {TagsComponent} from './components/body/tabs/tab-summary/vmware/tags/tags.component';
import {RelatedObjectsComponent} from './components/body/tabs/tab-summary/vmware/related-objects/related-objects.component';
import {CustomAttributesComponent} from './components/body/tabs/tab-summary/vmware/custom-attributes/custom-attributes.component';
import {VmStoragePoliciesComponent} from './components/body/tabs/tab-summary/vmware/vm-storage-policies/vm-storage-policies.component';
import {SummaryInfoComponent} from './components/body/tabs/tab-summary/vmware/summary-info/summary-info.component';

import {DatastoreClusterResourcesComponent} from './components/body/tabs/tab-summary/vmware/datastore-cluster-resources/datastore-cluster-resources.component';
import {VappStatusComponent} from './components/body/tabs/tab-summary/vmware/vapp-status/vapp-status.component';
import {ResourcePoolSettingsComponent} from './components/body/tabs/tab-summary/vmware/resource-pool-settings/resource-pool-settings.component';
import {HostHardwareComponent} from './components/body/tabs/tab-summary/vmware/host-hardware/host-hardware.component';
import {HostConfigurationComponent} from './components/body/tabs/tab-summary/vmware/host-configuration/host-configuration.component';
import {VsphereDrsComponent} from './components/body/tabs/tab-summary/vmware/vsphere-drs/vsphere-drs.component';
import {ClusterResourcesComponent} from './components/body/tabs/tab-summary/vmware/cluster-resources/cluster-resources.component';
import {ClusterConsumersComponent} from './components/body/tabs/tab-summary/vmware/cluster-consumers/cluster-consumers.component';
import {VcenterHaComponent} from './components/body/tabs/tab-summary/vmware/vcenter-ha/vcenter-ha.component';
import {VersionInformationComponent} from './components/body/tabs/tab-summary/vmware/version-information/version-information.component';
import {StorageDrsComponent} from './components/body/tabs/tab-summary/vmware/storage-drs/storage-drs.component';
import {SwitchFeaturesComponent} from './components/body/tabs/tab-summary/vmware/switch-features/switch-features.component';

@NgModule({
  declarations: [
    ActionsComponent,
    BodyComponent,
    BodyNewConnectionComponent,
    MenuComponent,
    StatusComponent,

    ChipsComponent,

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

    KubernetesObjectDetailComponent,
    ObjectListComponent,

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
    SwitchFeaturesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // Shared module import
    AnyOpsOSExtLibWeavescopeModule,
    AnyOpsOSLibAngularMaterialModule,
    AnyOpsOSLibUtilsModule
  ],
  exports: []
})
export class AnyOpsOSAppInfrastructureManagerModule {
  constructor(private serviceInjector: AnyOpsOSLibServiceInjectorService,
              private readonly LibApplication: AnyOpsOSLibApplicationService,
              private InfrastructureManager: AnyOpsOSAppInfrastructureManagerService,
              private InfrastructureManagerObjectHelpers: AnyOpsOSAppInfrastructureManagerObjectHelperService,
              private InfrastructureManagerNodeLink: AnyOpsOSAppInfrastructureManagerNodeLinkService,
              private InfrastructureManagerNodeGraph: AnyOpsOSAppInfrastructureManagerNodeGraphService) {

    this.serviceInjector.set('AnyOpsOSAppInfrastructureManagerService', this.InfrastructureManager);
    this.serviceInjector.set('AnyOpsOSAppInfrastructureManagerNodeLinkService', this.InfrastructureManagerNodeLink);
    this.serviceInjector.set('AnyOpsOSAppInfrastructureManagerNodeGraphService', this.InfrastructureManagerNodeGraph);
    this.serviceInjector.set('AnyOpsOSAppInfrastructureManagerObjectHelperService', this.InfrastructureManagerObjectHelpers);

    this.LibApplication.registerApplication({
      uuid: 'infrastructure-manager',
      ico: 'fas fa-server',
      name: 'Infrastructure Manager',
      menu: true,
      actions: true,
      status: true,
      style: {width: '1700px', height: '800px', top: '4%', left: '7%'}
    });
  }
}
