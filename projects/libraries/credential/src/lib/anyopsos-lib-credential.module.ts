import {NgModule} from '@angular/core';

import {MainService} from '@anyopsos/frontend/app/services/main.service';

import {AnyOpsOSLibCredentialService} from './services/anyopsos-lib-credential.service';
import {AnyOpsOSLibCredentialStateService} from './services/anyopsos-lib-credential-state.service';

@NgModule({
  declarations: [],
  imports: [],
  exports: []
})
export class AnyOpsOSLibCredentialModule {

  constructor(private readonly MainService: MainService,
              private readonly LibCredential: AnyOpsOSLibCredentialService,
              private readonly LibCredentialState: AnyOpsOSLibCredentialStateService) {

    // Initialize credentials when user is loggedIn
    this.MainService.currentBootstrapState.subscribe((data: { appBootstrapped: boolean; }) => {
      if (data.appBootstrapped === true && !this.LibCredentialState.getCredentialsInitialized()) {

        // Get Credentials
        this.LibCredential.initCredentials();
      }
    });

  }

}
