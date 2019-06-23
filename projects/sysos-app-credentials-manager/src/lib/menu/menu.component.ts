import {Component, OnInit, Input} from '@angular/core';
import {Application} from '@sysos/libs-application';

@Component({
  selector: 'sacm-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Input() application: Application;
  @Input() isMenuOpened: boolean;

  constructor() { }

  ngOnInit() {
  }

}
