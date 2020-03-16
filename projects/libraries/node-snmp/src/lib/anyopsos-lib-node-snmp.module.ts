import {NgModule} from '@angular/core';

import {MainService} from '@anyopsos/frontend/app/services/main.service';

import {AnyOpsOSLibNodeSnmpConnectionsStateService} from './services/anyopsos-lib-node-snmp-connections-state.service';

@NgModule({
  declarations: [],
  imports: [],
  exports: []
})
export class AnyOpsOSLibNodeSnmpModule {

  constructor(private readonly MainService: MainService,
              private readonly LibNodeSnmpConnectionsState: AnyOpsOSLibNodeSnmpConnectionsStateService) {

    // Initialize connections when user is loggedIn
    this.MainService.currentBootstrapState.subscribe((data: { appBootstrapped: boolean; }) => {
      if (data.appBootstrapped === true && !this.LibNodeSnmpConnectionsState.getConnectionsInitialized()) {

        // Get Snmp connections
        this.LibNodeSnmpConnectionsState.initConnections();
      }
    });

  }
}
