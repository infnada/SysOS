import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {Credential} from '@anyopsos/module-credential';
import {BackendResponse} from '@anyopsos/backend-core/app/types/backend-response';

import {AnyOpsOSLibCredentialApiService} from './anyopsos-lib-credential-api.service';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibCredentialStateService {
  private credentialsInitialized: boolean = false;

  readonly $credentials: BehaviorSubject<Credential[] |[]>;
  private dataStore: {
    credentials: Credential[],
  };
  readonly credentials: Observable<Credential[]>;

  constructor(private readonly logger: AnyOpsOSLibLoggerService,
              private readonly LibCredentialApi: AnyOpsOSLibCredentialApiService) {

    this.dataStore = { credentials: [] };
    this.$credentials = new BehaviorSubject(this.dataStore.credentials);
    this.credentials = this.$credentials.asObservable();
  }

  /**
   * Setter & Getter of credentialsInitialized
   * This variable ensures Credentials are loaded only once
   */
  setCredentialsInitialized(): void {
    if (this.credentialsInitialized === true) {

      this.logger.error('LibCredential', 'setCredentialsInitialized -> Credentials already initialized');
      throw new Error('already_initialized');
    }

    this.credentialsInitialized = true;
  }

  getCredentialsInitialized(): boolean {
    return this.credentialsInitialized;
  }

  /**
   * Updates the current state with a new credential
   */
  async putCredential(credential: Credential): Promise<void> {
    this.logger.debug('LibCredential', 'New credential received');

    // New credential. Backend will return the credential with a uuid
    if (!credential.uuid) {
      credential.uuid = await this.saveBackend(credential, 'put');

      // Remove password after its stored at backend
      delete credential.password;

      this.dataStore.credentials.push(credential);

    // If already have an uuid, means that this is called on {@link AnyOpsOSLibCredentialService#initCredentials}
    } else {
      this.dataStore.credentials.push(credential);
    }

    this.$credentials.next(Object.assign({}, this.dataStore).credentials);
  }

  /**
   * Updates a credential state
   */
  async patchCredential(credentialUuid: string, param: string, data: any): Promise<void> {
    const credentialIndex: number = this.dataStore.credentials.findIndex((conn: Credential) => conn.uuid === credentialUuid);
    if (credentialIndex === -1) {
      this.logger.error('LibCredential', 'patchCredential -> Resource invalid');
      throw new Error('resource_invalid');
    }

    this.dataStore.credentials[credentialIndex][param] = data;

    // broadcast data to subscribers
    this.$credentials.next(Object.assign({}, this.dataStore).credentials);

    await this.saveBackend(this.dataStore.credentials[credentialIndex], 'patch');
  }

  async patchFullCredential(credential: Credential): Promise<void> {
    const credentialIndex: number = this.dataStore.credentials.findIndex((conn: Credential) => conn.uuid === credential.uuid);
    if (credentialIndex === -1) {
      this.logger.error('LibCredential', 'patchFullCredential -> Resource invalid');
      throw new Error('resource_invalid');
    }

    this.dataStore.credentials[credentialIndex] = credential;

    // broadcast data to subscribers
    this.$credentials.next(Object.assign({}, this.dataStore).credentials);

    await this.saveBackend(this.dataStore.credentials[credentialIndex], 'patch');
  }

  /**
   * Deletes a credential from state
   */
  async deleteCredential(credentialUuid: string): Promise<void> {
    const currentCredential: Credential = this.dataStore.credentials.find((credential: Credential) => credential.uuid === credentialUuid);
    if (!currentCredential) {
      this.logger.error('LibCredential', 'deleteCredential -> Resource invalid');
      throw new Error('resource_invalid');
    }

    this.dataStore.credentials = this.dataStore.credentials.filter((credential: Credential) => credential.uuid !== credentialUuid);

    // broadcast data to subscribers
    this.$credentials.next(Object.assign({}, this.dataStore).credentials);

    await this.saveBackend(currentCredential, 'delete');
  }

  /**
   * Saves current state persistently
   */
  private saveBackend(currentCredential: Credential, type: 'put' | 'patch' | 'delete'): Promise<string> {
    return new Promise(async (resolve, reject) => {

      let credentialObservable: Observable<Object>;

      if (type === 'put') credentialObservable = this.LibCredentialApi.putCredential(currentCredential);
      if (type === 'patch') credentialObservable = this.LibCredentialApi.patchCredential(currentCredential.uuid, currentCredential);
      if (type === 'delete') credentialObservable = this.LibCredentialApi.deleteCredential(currentCredential.uuid);

      credentialObservable.subscribe((credentialStatus: BackendResponse & { data: Credential }) => {
          if (credentialStatus.status === 'error') {
            this.logger.error('LibCredential', 'Error while saving credential', null, credentialStatus.data);
            return reject(credentialStatus.data);
          }

          this.logger.debug('LibCredential', 'Saved credential successfully');
          return resolve(credentialStatus.data);
        },
        error => {
          this.logger.error('LibCredential', 'Error while saving credential', null, error);
          return reject(error);
        });

    });
  }
}
