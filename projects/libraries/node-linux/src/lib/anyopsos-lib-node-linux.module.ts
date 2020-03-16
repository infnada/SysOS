import {NgModule} from '@angular/core';

import {MainService} from '@anyopsos/frontend/app/services/main.service';

import {AnyOpsOSLibNodeLinuxConnectionsStateService} from './services/anyopsos-lib-node-linux-connections-state.service';
import {AnyOpsOSLibNodeLinuxFileSystemHandlersService} from './services/anyopsos-lib-node-linux-file-system-handlers.service';

@NgModule({
  declarations: [],
  imports: [],
  exports: []
})
export class AnyOpsOSLibNodeLinuxModule {

  constructor(private readonly MainService: MainService,
              private readonly LibNodeLinuxConnectionsState: AnyOpsOSLibNodeLinuxConnectionsStateService,
              private readonly LibNodeLinuxFileSystemHandlers: AnyOpsOSLibNodeLinuxFileSystemHandlersService) {

    // Initialize connections when user is loggedIn
    this.MainService.currentBootstrapState.subscribe((data: { appBootstrapped: boolean; }) => {
      if (data.appBootstrapped === true && !this.LibNodeLinuxConnectionsState.getConnectionsInitialized()) {

        // Get Linux connections
        this.LibNodeLinuxConnectionsState.initConnections();

        // This allows to manage file and folders
        this.LibNodeLinuxFileSystemHandlers.registerFileSystemUiHandlers();
      }
    });

  }
}
