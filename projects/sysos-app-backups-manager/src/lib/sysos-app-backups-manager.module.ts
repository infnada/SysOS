import {NgModule} from '@angular/core';

import {SysosLibApplicationService} from '@sysos/lib-application';

import {SysosAppBackupsManagerComponent} from './sysos-app-backups-manager.component';

@NgModule({
  declarations: [SysosAppBackupsManagerComponent],
  imports: [],
  exports: [SysosAppBackupsManagerComponent]
})
export class SysosAppBackupsManagerModule {
  constructor(private Applications: SysosLibApplicationService) {
    Applications.registerApplication({
      id: 'backups-manager',
      ico: 'hdd-o',
      name: 'Backups Manager',
      menu: true,
      actions: true,
      style: {width: '1070px', height: '700px', top: '5%', left: '20%'}
    });
  }
}
