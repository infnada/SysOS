import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';
import {Credential} from '@anyopsos/module-credential';
import {BackendResponse} from '@anyopsos/backend/app/types/backend-response';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSAppCredentialsManagerService {
  private appInitialized: boolean = false;

  private $credentials: BehaviorSubject<Credential[]>;
  private $activeCredential: BehaviorSubject<string>;
  private dataStore: {
    credentials: Credential[],
    activeCredential: string
  };
  credentials: Observable<Credential[]>;
  activeCredential: Observable<string>;

  constructor(private readonly http: HttpClient,
              private readonly logger: AnyOpsOSLibLoggerService,
              private readonly Modal: AnyOpsOSLibModalService) {

    this.dataStore = {credentials: [], activeCredential: null};
    this.$credentials = new BehaviorSubject(this.dataStore.credentials);
    this.$activeCredential = new BehaviorSubject(this.dataStore.activeCredential);
    this.credentials = this.$credentials.asObservable();
    this.activeCredential = this.$activeCredential.asObservable();
  }

  isAppInitialized(): boolean {
    return this.appInitialized;
  }

  setActiveCredential(credentialUuid: string): void {
    this.dataStore.activeCredential = credentialUuid;

    this.$activeCredential.next(Object.assign({}, this.dataStore).activeCredential);
  }

  getCredentialByUuid(credentialUuid: string): Credential {
    if (!credentialUuid) throw new Error('uuid');

    return this.dataStore.credentials.find(obj => obj.uuid === credentialUuid);
  }

  /**
   * Initialize application
   */
  initCredentials(): void {
    this.http.get('/api/credential/')
      .subscribe((getCredentialsStatus: BackendResponse & { data: Credential[] }) => {
        if (getCredentialsStatus.status === 'error') {
          throw {
            error: getCredentialsStatus.data,
            description: 'Error while initializing credentials'
          };
        }

        this.appInitialized = true;

        this.dataStore.credentials = getCredentialsStatus.data;
        this.$credentials.next(Object.assign({}, this.dataStore).credentials);

        this.logger.info('Credentials Manager', 'Got credentials successfully');
      });
  }

  deleteCredential(credentialUuid?: string): void {
    const loggerArgs = arguments;

    if (!credentialUuid) credentialUuid = this.dataStore.activeCredential;

    this.Modal.openRegisteredModal('question', '.window--credentials-manager .window__main',
      {
        title: 'Delete credential ' + this.getCredentialByUuid(credentialUuid).description,
        text: 'Remove the selected credential from the inventory?',
        yes: 'Delete',
        yesClass: 'warn',
        no: 'Cancel',
        boxContent: 'This action is permanent.',
        boxClass: 'text-danger',
        boxIcon: 'warning'
      }
    ).then((modalInstance) => modalInstance.result
    ).then((result: boolean) => {
      if (result !== true) return;

      this.logger.debug('Credentials Manager', 'Deleting credential', loggerArgs);

      // Encode credential because it can contain symbols like '/'
      this.http.delete(`/api/credential/${encodeURIComponent(credentialUuid)}`)
        .subscribe((deleteCredentialResult: BackendResponse) => {
          if (deleteCredentialResult.status === 'error') {
            throw {
              error: deleteCredentialResult.data,
              description: 'Error while deleting credential'
            };
          }

          // Remove credential from dataStore
          this.setActiveCredential(null);
          this.dataStore.credentials = this.dataStore.credentials.filter((el) => el.uuid !== credentialUuid);

          this.$credentials.next(Object.assign({}, this.dataStore).credentials);

          this.logger.log('Credentials Manager', 'Deleted credential successfully', loggerArgs);
        },
        error => {
          this.logger.error('Credentials Manager', 'Error while deleting credential', loggerArgs, error);
        });
    });

  }

  saveCredential(credential: Credential): Promise<void> {
    const loggerArgs = arguments;

    return this.http.put('/api/credential/', {
      credential
    }).pipe(map(
      (saveCredentialStatus: BackendResponse & { data: string }) => {
        if (saveCredentialStatus.status === 'error') {
          throw {
            error: saveCredentialStatus.data,
            description: 'Error while saving credential'
          };
        }

        const credentialExists = this.dataStore.credentials.find(el => el.uuid === credential.uuid);

        // TODO manage other credentials types
        if (credentialExists) {
          credentialExists.description = credential.description;
          credentialExists.username = credential.username;

        } else {
          this.dataStore.credentials.push({
            uuid: saveCredentialStatus.data,
            description: credential.description,
            type: credential.type,
            username: credential.username
          });
        }

        this.dataStore.activeCredential = null;

        this.$credentials.next(Object.assign({}, this.dataStore).credentials);
        this.$activeCredential.next(Object.assign({}, this.dataStore).activeCredential);

        this.logger.log('Credentials Manager', 'Saved credential successfully', loggerArgs);
      },
      error => {
        this.logger.error('Credentials Manager', 'Error while saving credential', loggerArgs, error);
      }
    )).toPromise();

  }
}
