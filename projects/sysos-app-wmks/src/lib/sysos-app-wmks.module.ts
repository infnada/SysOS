import {NgModule} from '@angular/core';

import {SysosLibsApplicationService} from '@sysos/libs-application';

import {SysosAppWmksComponent} from './sysos-app-wmks.component';

@NgModule({
  declarations: [
    SysosAppWmksComponent
  ],
  imports: [],
  exports: [SysosAppWmksComponent]
})
export class SysosAppWmksModule {
  constructor(private Applications: SysosLibsApplicationService) {
    Applications.registerApplication({
      id: 'wmks',
      ico: 'television',
      name: 'VM Remote Console',
      menu: true,
      style: {width: '90%', height: '90%', top: '2%', left: '5%'}
    });
  }
}
