import {NgModule} from '@angular/core';

import {AnyOpsOSLibApplicationService} from '@anyopsos/lib-application';

import {AnyOpsOSAppWmksComponent} from './anyopsos-app-wmks.component';

@NgModule({
  declarations: [
    AnyOpsOSAppWmksComponent
  ],
  imports: [],
  exports: [AnyOpsOSAppWmksComponent]
})
export class AnyOpsOSAppWmksModule {
  constructor(private Applications: AnyOpsOSLibApplicationService) {
    Applications.registerApplication({
      id: 'wmks',
      ico: 'fas fa-tv',
      name: 'VM Remote Console',
      menu: true,
      style: {width: '90%', height: '90%', top: '2%', left: '5%'}
    });
  }
}
