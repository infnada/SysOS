import {NgModule} from '@angular/core';

import {MainService} from '@anyopsos/frontend/app/services/main.service';

import {AnyOpsOSLibSnmpConnectionsStateService} from './services/anyopsos-lib-snmp-connections-state.service';

@NgModule({
  declarations: [],
  imports: [],
  exports: []
})
export class AnyOpsOSLibSnmpModule {

  constructor(private readonly MainService: MainService,
              private readonly LibSnmpConnectionsState: AnyOpsOSLibSnmpConnectionsStateService) {

    // Initialize connections when user is loggedIn
    this.MainService.currentBootstrapState.subscribe((data: { appBootstrapped: boolean; }) => {
      if (data.appBootstrapped === true && !this.LibSnmpConnectionsState.getConnectionsInitialized()) {

        // Get Snmp connections
        this.LibSnmpConnectionsState.initConnections();
      }
    });

  }
}
