import {NgModule} from '@angular/core';

import {MainService} from '@anyopsos/frontend/app/services/main.service';

import {AnyOpsOSLibDockerConnectionsStateService} from './services/anyopsos-lib-docker-connections-state.service';
import {AnyOpsOSLibDockerFileSystemHandlersService} from './services/anyopsos-lib-docker-file-system-handlers.service';

@NgModule({
  declarations: [],
  imports: [],
  exports: []
})
export class AnyOpsOSLibDockerModule {

  constructor(private readonly MainService: MainService,
              private readonly LibDockerConnectionsState: AnyOpsOSLibDockerConnectionsStateService,
              private readonly LibDockerFileSystemHandlers: AnyOpsOSLibDockerFileSystemHandlersService) {

    // Initialize connections when user is loggedIn
    this.MainService.currentBootstrapState.subscribe((data: { appBootstrapped: boolean; }) => {
      if (data.appBootstrapped === true && !this.LibDockerConnectionsState.getConnectionsInitialized()) {

        // Get Docker connections
        this.LibDockerConnectionsState.initConnections();

        // This allows to manage file and folders
        this.LibDockerFileSystemHandlers.registerFileSystemUiHandlers();
      }
    });

  }
}
