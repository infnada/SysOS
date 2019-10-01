import {NgModule} from '@angular/core';

import {SysosLibApplicationService} from '@sysos/lib-application';

import {SysosAppWmksComponent} from './sysos-app-wmks.component';

@NgModule({
  declarations: [
    SysosAppWmksComponent
  ],
  imports: [],
  exports: [SysosAppWmksComponent]
})
export class SysosAppWmksModule {
  constructor(private Applications: SysosLibApplicationService) {
    Applications.registerApplication({
      id: 'wmks',
      ico: 'fas fa-tv',
      name: 'VM Remote Console',
      menu: true,
      style: {width: '90%', height: '90%', top: '2%', left: '5%'}
    });
  }
}
