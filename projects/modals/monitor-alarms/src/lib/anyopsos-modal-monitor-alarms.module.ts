import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AnyOpsOSLibAngularMaterialModule} from '@anyopsos/lib-angular-material';
import {AnyOpsOSLibModalModule, AnyOpsOSLibModalRegisteredStateService} from '@anyopsos/lib-modal';
import {AnyOpsOSLibPipesModule} from '@anyopsos/lib-pipes';

import {EntryComponent} from './entry/entry.component';
import {AnyOpsOSModalMonitorAlarmsComponent} from './anyopsos-modal-monitor-alarms.component';

import {AlarmComponent} from './components/alarm/alarm.component';

@NgModule({
  declarations: [
    AnyOpsOSModalMonitorAlarmsComponent,
    EntryComponent,
    AlarmComponent
  ],
  imports: [
    CommonModule,
    // Shared module import
    AnyOpsOSLibAngularMaterialModule,
    AnyOpsOSLibModalModule,
    AnyOpsOSLibPipesModule
  ],
  exports: [],
  providers: [],
  entryComponents: [
    AnyOpsOSModalMonitorAlarmsComponent
  ]
})
export class AnyOpsOSModalMonitorAlarmsModule {

  constructor(private readonly ModalRegisteredState: AnyOpsOSLibModalRegisteredStateService) {

    ModalRegisteredState.putModal({
      uuid: 'monitor-alarms',
      size: 'lg'
    });

  }

}
