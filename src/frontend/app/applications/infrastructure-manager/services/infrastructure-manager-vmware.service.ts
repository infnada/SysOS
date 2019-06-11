import { Injectable } from '@angular/core';
import {Subscription} from 'rxjs';

import {InfrastructureManagerService} from './infrastructure-manager.service';
import {IMConnection} from '../interfaces/IMConnection';
import {IMESXiHost} from '../interfaces/IMESXiHost';

@Injectable({
  providedIn: 'root'
})
export class InfrastructureManagerVmwareService {

  private connectGetDataSubscription: Subscription;

  constructor(private InfrastructureManager: InfrastructureManagerService) {
    this.connectGetDataSubscription = this.InfrastructureManager.getObserverConnectGetData().subscribe((connection) => {
      if (connection.type === 'vmware') this.getVMWareData(connection);
    });
  }

  getVMWareData(connection: IMConnection): void {

  }

  /**
   * @description
   * Gets all ESXi hosts from all existing vCenter connections
   */
  getESXihosts(): IMESXiHost[] {
    const connections = this.InfrastructureManager.getConnectionsByType('vmware');
    const ESXihosts: IMESXiHost[] = [];

    connections.forEach((vcenter: IMConnection) => {
      vcenter.data.Datacenters.forEach(datacenter => {

        // Standalone hosts
        datacenter.Hosts.forEach(host => {

          // Setup basic connection information required for "Backups Manager" application
          ESXihosts.push({
            connection_uuid: vcenter.uuid,
            connection_state: host.connection_state,
            host: host.host,
            name: host.name,
            power_state: host.power_state,
            connection_credential: vcenter.credential,
            connection_address: vcenter.host,
            connection_port: vcenter.port,
            datacenter: datacenter.datacenter
          });
        });

        // Cluster hosts
        datacenter.Clusters.forEach(cluster => {
          cluster.Hosts.forEach(host => {

            // Setup basic connection information required for "Backups Manager" application
            ESXihosts.push({
              connection_uuid: vcenter.uuid,
              connection_state: host.connection_state,
              host: host.host,
              name: host.name,
              power_state: host.power_state,
              connection_credential: vcenter.credential,
              connection_address: vcenter.host,
              connection_port: vcenter.port,
              datacenter: datacenter.datacenter
            });
          });
        });

      });
    });

    return ESXihosts;
  }
}
