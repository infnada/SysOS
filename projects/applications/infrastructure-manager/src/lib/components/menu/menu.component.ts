import {Component, OnInit, Input} from '@angular/core';
import {Application} from '@anyopsos/lib-application';

@Component({
  selector: 'aaim-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Input() private readonly application: Application;
  @Input() readonly isMenuOpened: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
