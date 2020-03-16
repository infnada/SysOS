import {NgModule} from '@angular/core';

import {MainService} from '@anyopsos/frontend/app/services/main.service';

import {AnyOpsOSLibNodeDockerConnectionsStateService} from './services/anyopsos-lib-node-docker-connections-state.service';
import {AnyOpsOSLibNodeDockerFileSystemHandlersService} from './services/anyopsos-lib-node-docker-file-system-handlers.service';

@NgModule({
  declarations: [],
  imports: [],
  exports: []
})
export class AnyOpsOSLibNodeDockerModule {

  constructor(private readonly MainService: MainService,
              private readonly LibNodeDockerConnectionsState: AnyOpsOSLibNodeDockerConnectionsStateService,
              private readonly LibNodeDockerFileSystemHandlers: AnyOpsOSLibNodeDockerFileSystemHandlersService) {

    // Initialize connections when user is loggedIn
    this.MainService.currentBootstrapState.subscribe((data: { appBootstrapped: boolean; }) => {
      if (data.appBootstrapped === true && !this.LibNodeDockerConnectionsState.getConnectionsInitialized()) {

        // Get Docker connections
        this.LibNodeDockerConnectionsState.initConnections();

        // This allows to manage file and folders
        this.LibNodeDockerFileSystemHandlers.registerFileSystemUiHandlers();
      }
    });

  }
}
