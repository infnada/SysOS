import {Injectable} from '@angular/core';

import {Credential} from '@anyopsos/module-credential';
import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';

import {AnyOpsOSLibCredentialStateService} from './anyopsos-lib-credential-state.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibCredentialHelpersService {

  constructor(private readonly logger: AnyOpsOSLibLoggerService,
              private readonly LibCredentialState: AnyOpsOSLibCredentialStateService) {
  }

  /**
   * Gets a credential state by given credentialUuid
   */
  getCredentialByUuid(credentialUuid: string): Credential {
    const credentials: Credential[] = this.getAllCredentials();

    const currentCredential: Credential = credentials.find((credential: Credential) => {
      return credential.uuid === credentialUuid;
    });

    if (!currentCredential) {
      this.logger.error('LibCredential', 'getCredentialByUuid -> Resource invalid');
      throw new Error('resource_invalid');
    }
    return currentCredential;
  }

  /**
   * Returns all connections
   */
  getAllCredentials(): Credential[] {
    return this.LibCredentialState.$credentials.getValue();
  }

  /**
   * Returns all connections as Observable
   */
  getAllCredentialsObserver(): Observable<Credential[]> {
    return this.LibCredentialState.credentials;
  }
}
