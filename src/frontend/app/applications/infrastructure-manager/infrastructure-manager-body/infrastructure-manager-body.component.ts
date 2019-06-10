import {Component, Input, OnInit} from '@angular/core';
import {Application} from '../../../interfaces/application';
import {InfrastructureManagerService} from '../services/infrastructure-manager.service';
import {IMConnection} from '../interfaces/IMConnection';

@Component({
  selector: 'app-infrastructure-manager-body',
  templateUrl: './infrastructure-manager-body.component.html',
  styleUrls: ['./infrastructure-manager-body.component.scss']
})
export class InfrastructureManagerBodyComponent implements OnInit {
  @Input() application: Application;

  activeConnection: string;

  viewSide: boolean = true;

  constructor(private InfrastructureManager: InfrastructureManagerService) { }

  ngOnInit() {
    this.InfrastructureManager.activeConnection.subscribe(activeConnection => this.activeConnection = activeConnection);
  }

  toggleSide(): void {
    this.viewSide = !this.viewSide;
  }

  setActiveConnection(connection: IMConnection): void {
    this.InfrastructureManager.setActiveConnection(connection.uuid);
  }

  getActiveConnection(): IMConnection {
    return this.InfrastructureManager.getActiveConnection();
  }

}
