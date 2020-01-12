import {Component, OnInit, Input} from '@angular/core';
import {Application} from '@anyopsos/lib-application';

@Component({
  selector: 'aassh-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Input() application: Application;
  @Input() isMenuOpened: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }

}
