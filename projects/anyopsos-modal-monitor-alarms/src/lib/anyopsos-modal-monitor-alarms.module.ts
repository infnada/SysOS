import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {NgbModalModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {OrderModule} from 'ngx-order-pipe';

import {AnyOpsOSLibAngularMaterialModule} from '@anyopsos/lib-angular-material';
import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';
import {AnyOpsOSLibSanitizeModule} from '@anyopsos/lib-sanitize';

import {AnyOpsOSModalMonitorAlarmsComponent} from './components/anyopsos-modal-monitor-alarms.component';
import {EntryComponent} from './monitor-alarms-entry/entry.component';
import { AlarmComponent } from './components/alarm/alarm.component';

@NgModule({
  declarations: [
    AnyOpsOSModalMonitorAlarmsComponent,
    EntryComponent,
    AlarmComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
    OrderModule,
    // Shared module import
    AnyOpsOSLibAngularMaterialModule,
    AnyOpsOSLibSanitizeModule,
    AnyOpsOSLibSanitizeModule,
  ],
  providers: [
    NgbActiveModal
  ],
  exports: [],
  entryComponents: [
    AnyOpsOSModalMonitorAlarmsComponent,
    EntryComponent
  ]
})
export class AnyOpsOSModalMonitorAlarmsModule {

  constructor(private Modal: AnyOpsOSLibModalService) {

    Modal.registerModal({
      modalId: 'monitor-alarms',
      size: 'lg'
    });

  }
}
