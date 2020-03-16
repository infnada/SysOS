import {NgModule} from '@angular/core';

import {MainService} from '@anyopsos/frontend/app/services/main.service';

import {AnyOpsOSLibNodeKubernetesConnectionsStateService} from './services/anyopsos-lib-node-kubernetes-connections-state.service';
import {AnyOpsOSLibNodeKubernetesFileSystemHandlersService} from './services/anyopsos-lib-node-kubernetes-file-system-handlers.service';

@NgModule({
  declarations: [],
  imports: [],
  exports: []
})
export class AnyOpsOSLibNodeKubernetesModule {

  constructor(private readonly MainService: MainService,
              private readonly LibNodeKubernetesConnectionsState: AnyOpsOSLibNodeKubernetesConnectionsStateService,
              private readonly LibNodeKubernetesFileSystemHandlers: AnyOpsOSLibNodeKubernetesFileSystemHandlersService) {

    // Initialize connections when user is loggedIn
    this.MainService.currentBootstrapState.subscribe((data: { appBootstrapped: boolean; }) => {
      if (data.appBootstrapped === true && !this.LibNodeKubernetesConnectionsState.getConnectionsInitialized()) {

        // Get Kubernetes connections
        this.LibNodeKubernetesConnectionsState.initConnections();

        // This allows to manage file and folders
        this.LibNodeKubernetesFileSystemHandlers.registerFileSystemUiHandlers();
      }
    });

  }
}
