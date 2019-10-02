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
  MatProgressBarModule,
  MatTabsModule,
  MatExpansionModule,
  MatSortModule,
  MatTableModule
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
import {SysosAppInfrastructureVmwareService} from './services/vmware/sysos-app-infrastructure-vmware.service';
import {SysosAppInfrastructureNetappService} from './services/netapp/sysos-app-infrastructure-netapp.service';
import {BodyVmwareComponent} from './body/body-vmware/body-vmware.component';
import {BodyNetappComponent} from './body/body-netapp/body-netapp.component';
import {BodyNetappVserverComponent} from './body/body-netapp-vserver/body-netapp-vserver.component';
import {BodyNetappVolumeComponent} from './body/body-netapp-volume/body-netapp-volume.component';
import {BodyNetappSnapshotComponent} from './body/body-netapp-snapshot/body-netapp-snapshot.component';
import {VmwareRecentTasksComponent} from './body/vmware-recent-tasks/vmware-recent-tasks.component';
import {TagsComponent} from './body/body-vmware/tab-summary/tags/tags.component';
import {VmHardwareComponent} from './body/body-vmware/tab-summary/vm-hardware/vm-hardware.component';
import {NotesComponent} from './body/body-vmware/tab-summary/notes/notes.component';
import {RelatedObjectsComponent} from './body/body-vmware/tab-summary/related-objects/related-objects.component';
import {CustomAttributesComponent} from './body/body-vmware/tab-summary/custom-attributes/custom-attributes.component';
import {VmStoragePoliciesComponent} from './body/body-vmware/tab-summary/vm-storage-policies/vm-storage-policies.component';
import {TitlebarComponent} from './body/body-vmware/titlebar/titlebar.component';
import {SummaryStatsComponent} from './body/body-vmware/tab-summary/summary-stats/summary-stats.component';
import {SummaryInfoComponent} from './body/body-vmware/tab-summary/summary-info/summary-info.component';
import {SummaryImageComponent} from './body/body-vmware/tab-summary/summary-image/summary-image.component';
import {TabSummaryComponent} from './body/body-vmware/tab-summary/tab-summary.component';
import {HomeComponent} from './body/body-vmware/home/home.component';
import {ObjectComponent} from './body/body-vmware/object/object.component';

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
    VmHardwareComponent,
    NotesComponent,
    RelatedObjectsComponent,
    CustomAttributesComponent,
    VmStoragePoliciesComponent,
    TitlebarComponent,
    SummaryStatsComponent,
    SummaryInfoComponent,
    SummaryImageComponent,
    TabSummaryComponent,
    HomeComponent,
    ObjectComponent
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
    MatTabsModule,
    MatExpansionModule,
    MatSortModule,
    MatTableModule,
    ToastrModule.forRoot()
  ],
  exports: []
})
export class SysosAppInfrastructureManagerModule {
  constructor(private serviceInjector: SysosLibServiceInjectorService,
              private Applications: SysosLibApplicationService,
              private InfrastructureManager: SysosAppInfrastructureManagerService,
              private InfrastructureVmwareService: SysosAppInfrastructureVmwareService,
              private InfrastructureNetAppService: SysosAppInfrastructureNetappService) {

    this.serviceInjector.set('SysosAppInfrastructureManagerService', this.InfrastructureManager);
    this.serviceInjector.set('SysosAppInfrastructureVmwareService', this.InfrastructureVmwareService);

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
    this.InfrastructureVmwareService.registerFileSystemUiHandlers();
    this.InfrastructureNetAppService.registerFileSystemUiHandlers();
  }
}
