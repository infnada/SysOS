import {NgModule, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ApplicationsService} from '../../services/applications.service';
import {WmksComponent} from './wmks.component';
import {WmksBodyComponent} from './wmks-body/wmks-body.component';
import {WmksMenuComponent} from './wmks-menu/wmks-menu.component';

@NgModule({
  declarations: [WmksComponent, WmksBodyComponent, WmksMenuComponent],
  imports: [
    CommonModule
  ]
})
export class WmksModule implements OnInit {

  constructor(private Applications: ApplicationsService) {
    Applications.registerApplication({
      id: 'wmks',
      ico: 'television',
      name: 'VM Remote Console',
      menu: true,
      style: {width: '90%', height: '90%', top: '2%', left: '5%'}
    });
  }

  ngOnInit() {

  }
}
