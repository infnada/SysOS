import {NgModule} from '@angular/core';

import {MainService} from '@anyopsos/frontend/app/services/main.service';

import {AnyOpsOSLibKubernetesConnectionsStateService} from './services/anyopsos-lib-kubernetes-connections-state.service';
import {AnyOpsOSLibKubernetesFileSystemHandlersService} from './services/anyopsos-lib-kubernetes-file-system-handlers.service';

@NgModule({
  declarations: [],
  imports: [],
  exports: []
})
export class AnyOpsOSLibKubernetesModule {

  constructor(private readonly MainService: MainService,
              private readonly LibKubernetesConnectionsState: AnyOpsOSLibKubernetesConnectionsStateService,
              private readonly LibKubernetesFileSystemHandlers: AnyOpsOSLibKubernetesFileSystemHandlersService) {

    // Initialize connections when user is loggedIn
    this.MainService.currentBootstrapState.subscribe((data: { appBootstrapped: boolean; }) => {
      if (data.appBootstrapped === true && !this.LibKubernetesConnectionsState.getConnectionsInitialized()) {

        // Get Kubernetes connections
        this.LibKubernetesConnectionsState.initConnections();

        // This allows to manage file and folders
        this.LibKubernetesFileSystemHandlers.registerFileSystemUiHandlers();
      }
    });

  }
}
