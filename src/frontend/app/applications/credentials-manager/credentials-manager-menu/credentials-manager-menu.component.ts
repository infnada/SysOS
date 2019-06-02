import {Component, Input, OnInit} from '@angular/core';
import {Application} from '../../../interfaces/application';

@Component({
  selector: 'app-credentials-manager-menu',
  templateUrl: './credentials-manager-menu.component.html',
  styleUrls: ['./credentials-manager-menu.component.scss']
})
export class CredentialsManagerMenuComponent implements OnInit {
  @Input() application: Application;

  constructor() { }

  ngOnInit() {
  }

}
