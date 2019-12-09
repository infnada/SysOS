import {Component, Input, OnInit} from '@angular/core';

import {Application} from '@anyopsos/lib-application';

@Component({
  selector: 'sadrw-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Input() application: Application;
  @Input() isMenuOpened: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
