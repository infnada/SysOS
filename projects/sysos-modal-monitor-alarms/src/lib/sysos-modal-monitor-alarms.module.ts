import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTabsModule, MatSlideToggleModule, MatExpansionModule, MatTooltipModule} from '@angular/material';

import {NgbActiveModal, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {OrderModule} from 'ngx-order-pipe';

import {SysosLibModalService} from '@sysos/lib-modal';
import {SysosLibSanitizeModule} from '@sysos/lib-sanitize';

import {SysosModalMonitorAlarmsComponent} from './components/sysos-modal-monitor-alarms.component';
import {EntryComponent} from './monitor-alarms-entry/entry.component';
import { AlarmComponent } from './components/alarm/alarm.component';

@NgModule({
  declarations: [
    SysosModalMonitorAlarmsComponent,
    EntryComponent,
    AlarmComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatExpansionModule,
    NgbModalModule,
    OrderModule,
    SysosLibSanitizeModule,
    SysosLibSanitizeModule,
  ],
  providers: [
    NgbActiveModal
  ],
  exports: [],
  entryComponents: [
    SysosModalMonitorAlarmsComponent,
    EntryComponent
  ]
})
export class SysosModalMonitorAlarmsModule {

  constructor(private Modal: SysosLibModalService) {

    Modal.registerModal({
      modalId: 'monitor-alarms',
      size: 'lg'
    });

  }
}
