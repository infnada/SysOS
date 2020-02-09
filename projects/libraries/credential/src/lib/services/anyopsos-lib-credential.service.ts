import {Injectable} from '@angular/core';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {Credential} from '@anyopsos/module-credential';
import {BackendResponse} from '@anyopsos/backend/app/types/backend-response';

import {AnyOpsOSLibCredentialStateService} from './anyopsos-lib-credential-state.service';
import {AnyOpsOSLibCredentialHelpersService} from './anyopsos-lib-credential-helpers.service';
import {AnyOpsOSLibCredentialApiService} from './anyopsos-lib-credential-api.service';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibCredentialService {

  constructor(private readonly logger: AnyOpsOSLibLoggerService,
              private readonly LibCredentialState: AnyOpsOSLibCredentialStateService,
              private readonly LibCredentialHelpers: AnyOpsOSLibCredentialHelpersService,
              private readonly LibCredentialApi: AnyOpsOSLibCredentialApiService) {
  }

  /**
   * Called by Module when the library loads.
   * Sets the initial state.
   */
  initCredentials(): void {
    if (this.LibCredentialState.getCredentialsInitialized()) throw new Error('credentials_already_initialized');

    this.LibCredentialApi.getCredentials().subscribe(
      (credentialsData: BackendResponse & { data: Credential[]; }) => {
        if (credentialsData.status === 'error') {
          this.logger.error('LibCredential', 'initCredentials -> Error while getting credentials', null, credentialsData.data);
          throw credentialsData.data;
        }

        // Update state
        credentialsData.data.forEach((credential: Credential) => this.LibCredentialState.putCredential(credential));

        this.logger.info('Credentials Manager', 'Got credentials successfully');
      },
      (error: any) => {
        this.logger.error('LibCredential', 'Error while getting credentials', null, error);
      });

    this.LibCredentialState.setCredentialsInitialized();
  }

  /**
   * Deletes a credential
   */
  async deleteCredential(credentialUuid: string): Promise<void> {
    this.logger.debug('LibCredential', 'Deleting credential');

    return new Promise(async (resolve, reject) => {

      const currentCredential: Credential = await this.LibCredentialHelpers.getCredentialByUuid(credentialUuid);
      if (!currentCredential) {
        this.logger.error('LibCredential', 'deleteCredential -> Resource invalid');
        throw new Error('resource_invalid');
      }

      this.LibCredentialState.deleteCredential(credentialUuid).then(() => {
        return resolve();
      }).catch((e: any) => {
        return reject(e);
      });
    });
  }
}
