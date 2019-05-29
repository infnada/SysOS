import {Component, Input, OnInit} from '@angular/core';
import {Application} from "../../../interfaces/application";

@Component({
  selector: 'app-credentials-manager-status',
  templateUrl: './credentials-manager-status.component.html',
  styleUrls: ['./credentials-manager-status.component.scss']
})
export class CredentialsManagerStatusComponent implements OnInit {
  @Input() application: Application;

  constructor() { }

  ngOnInit() {
  }

}
