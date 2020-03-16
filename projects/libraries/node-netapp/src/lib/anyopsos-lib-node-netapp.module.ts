import {NgModule} from '@angular/core';

import {MainService} from '@anyopsos/frontend/app/services/main.service';

import {AnyOpsOSLibNodeNetappConnectionsStateService} from './services/anyopsos-lib-node-netapp-connections-state.service';
import {AnyOpsOSLibNodeNetappFileSystemHandlersService} from './services/anyopsos-lib-node-netapp-file-system-handlers.service';

@NgModule({
  declarations: [],
  imports: [],
  exports: []
})
export class AnyOpsOSLibNodeNetappModule {

  constructor(private readonly MainService: MainService,
              private readonly LibNodeNetappConnectionsState: AnyOpsOSLibNodeNetappConnectionsStateService,
              private readonly LibNodeNetappFileSystemHandlers: AnyOpsOSLibNodeNetappFileSystemHandlersService) {

    // Initialize connections when user is loggedIn
    this.MainService.currentBootstrapState.subscribe((data: { appBootstrapped: boolean; }) => {
      if (data.appBootstrapped === true && !this.LibNodeNetappConnectionsState.getConnectionsInitialized()) {

        // Get Netapp connections
        this.LibNodeNetappConnectionsState.initConnections();

        // This allows to manage file and folders
        this.LibNodeNetappFileSystemHandlers.registerFileSystemUiHandlers();
      }
    });

  }
}
