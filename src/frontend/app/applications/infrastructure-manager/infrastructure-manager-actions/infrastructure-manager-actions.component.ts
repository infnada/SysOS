import {Component, Input, OnInit} from '@angular/core';
import {Application} from '../../../interfaces/application';

@Component({
  selector: 'app-infrastructure-manager-actions',
  templateUrl: './infrastructure-manager-actions.component.html',
  styleUrls: ['./infrastructure-manager-actions.component.scss']
})
export class InfrastructureManagerActionsComponent implements OnInit {
  @Input() application: Application;

  constructor() { }

  ngOnInit() {
  }

}
