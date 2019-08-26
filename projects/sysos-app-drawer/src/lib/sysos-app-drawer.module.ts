import {NgModule} from '@angular/core';

import {SysosLibApplicationService} from '@sysos/lib-application';

import {BodyComponent} from './body/body.component';
import {MenuComponent} from './menu/menu.component';
import {ShapesService} from './services/shapes.service';

@NgModule({
  declarations: [BodyComponent, MenuComponent],
  imports: [],
  exports: []
})
export class SysosAppDrawerModule {

  constructor(private Applications: SysosLibApplicationService,
              private Shapes: ShapesService) {

    Applications.registerApplication({
      id: 'drawer',
      ico: 'paint-brush',
      name: 'Drawer',
      menu: true,
      style: {width: '600px', height: '300px', top: '10%', left: '30%'}
    });

    this.Shapes.registerShapes();
  }
}
